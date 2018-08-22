import { paramsForServer } from 'feathers-hooks-common';

import api from '../../api';
import store from '../index';

const requestEvent = () => (
  {
    type: 'REQUEST_EVENT',
  }
);

const receiveEvent = event => (
  {
    type: 'RECEIVE_EVENT',
    event,
  }
);

const resetEvent = () => (
  {
    type: 'RESET_EVENT',
  }
);

const updateEventCallback = (data) => {
  store.dispatch(receiveEvent(data));
};

const startEvent = event => (
  (dispatch) => {
    dispatch(requestEvent());

    return api.events
      .patch(event, { $push: { guests: store.getState().auth.user._id } }) // eslint-disable-line
      .then((response) => {
        dispatch(receiveEvent(response));

        api.events.on('patched', updateEventCallback);

        api.events.on('updated', updateEventCallback);

        return response;
      }, (error) => {
        dispatch(receiveEvent({}));
        return error;
      });
  }
);

const clearEvent = event => (
  (dispatch) => {
    dispatch(resetEvent());

    api.events.removeListener('patched', updateEventCallback);

    api.events.removeListener('updated', updateEventCallback);

    return api.events
      .patch(event, { $pull: { guests: { $eq: store.getState().auth.user._id } } }) // eslint-disable-line
      .then(response => response, error => error);
  }
);

export default {
  startEvent,
  clearEvent,
};
