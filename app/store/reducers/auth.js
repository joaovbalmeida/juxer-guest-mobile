const initialState = {
  authenticated: false,
  token: {
    isFetching: false,
    lastUpdated: '',
    data: '',
  },
  user: {
    isFetching: false,
    lastUpdated: '',
    data: {},
  },
  anonym: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_USER':
      return Object.assign({}, state, {
        user: {
          isFetching: true,
          lastUpdated: '',
          data: {},
        },
      });

    case 'RECEIVE_USER':
      return Object.assign({}, state, {
        user: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.user,
        },
      });

    case 'RESET_USER':
      return Object.assign({}, state, {
        user: {
          isFetching: false,
          lastUpdated: '',
          data: {},
        },
        anonym: false,
      });

    case 'REQUEST_TOKEN':
      return Object.assign({}, state, {
        token: {
          data: '',
          isFetching: true,
          lastUpdated: '',
        },
        authenticated: false,
      });

    case 'RECEIVE_TOKEN':
      return Object.assign({}, state, {
        token: {
          data: action.token,
          isFetching: false,
          lastUpdated: Date.now(),
        },
        authenticated: action.auth,
      });

    case 'UPDATE_ANONYM':
      return Object.assign({}, state, {
        anonym: action.anonym,
      });

    default:
      return state;
  }
};

export default auth;
