import {useReducer, useEffect} from 'react'
import axios from 'axios';

const ACTION_TYPES = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
  HasNextPage: 'hasNextPage'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.MAKE_REQUEST:
      return { loading: true, jobs: [] }
    
    case ACTION_TYPES.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };

    case ACTION_TYPES.ERROR:
      return { ...state, loading: false, error: action.payload.error, jobs: [] };
    
    case ACTION_TYPES.HasNextPage:
      return { ...state, hasNextPage: action.payload.hasNextPage };

    default:
      return state;
  }
} 

const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_URL = proxy + 'https://jobs.github.com/positions.json';

export default function useJobsApi(params, page) {
  const [state, dispatch] = useReducer(reducer, {jobs:[], loading: true});

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTION_TYPES.MAKE_REQUEST })
    axios.get(API_URL, {
      cancelToken: cancelToken.token,
      params: {markdown: true, page: page, ...params}
    }).then(res => {
      dispatch({ type: ACTION_TYPES.GET_DATA, payload: {jobs: res.data} });
    }).catch(e => {
      if(axios.isCancel(e)) return 
      dispatch({ type: ACTION_TYPES.ERROR, payload: { error: e } });
    });

    const cancelToken2 = axios.CancelToken.source();
    axios.get(API_URL, {
      cancelToken: cancelToken2.token,
      params: {markdown: true, page: page + 1, ...params}
    }).then(res => {
      dispatch({ type: ACTION_TYPES.HasNextPage, payload: {hasNextPage: res.data.length!==0 } });
    }).catch(e => {
      if(axios.isCancel(e)) return 
      dispatch({ type: ACTION_TYPES.ERROR, payload: { error: e } });
    });

    return () => {
      cancelToken.cancel();
      cancelToken2.cancel();
    }

  }, [params, page]);

  return state;
}
