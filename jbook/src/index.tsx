import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.11.12/esbuild.wasm',
    });
    ref.current = true;
  }

  useEffect(() => {
    startService()
  }, [])

  const onClick = async() => {
    if(!ref.current) {
      return
    }
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': 'production',
        global: 'window',
      },
    });
    console.log(result)
    setCode(result.outputFiles[0].text)

    try {
      eval(result.outputFiles[0].text)
    } catch (err) {
      alert(err)
    }
  }
  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe src="/test.html" />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'));