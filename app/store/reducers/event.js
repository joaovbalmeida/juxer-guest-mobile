const initialState = {
  event: {
    isFetching: false,
    lastUpdated: '',
    data: {},
  },
};

const event = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_EVENT':
      return Object.assign({}, state, {
        event: {
          isFetching: true,
          lastUpdated: '',
          data: {},
        },
      });

    case 'RECEIVE_EVENT':
      return Object.assign({}, state, {
        event: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.event,
        },
      });

    case 'RESET_EVENT':
      return Object.assign({}, state, {
        event: {
          isFetching: false,
          lastUpdated: '',
          data: {},
        },
      });

    default:
      return state;
  }
};

export default event;
