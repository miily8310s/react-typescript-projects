interface RepositoriesStete {
  loading: boolean;
  error: string | null;
  data: string[];
}

interface Action {
  type: string;
  payload: string[];
}

const reducer = (state: RepositoriesStete, action: Action) => {
  switch (action.type) {
    case 'search_repositories':
      return { loading: true, error: null, data: [] };
    case 'search_repositories_success':
      return { loading: true, error: null, data: action.payload };
    case 'search_repositories_error':
      return { loading: true, error: null, data: [] };
    default:
      return state;
  }
};

export default reducer;
