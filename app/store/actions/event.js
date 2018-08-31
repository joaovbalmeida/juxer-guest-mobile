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

const fetchEvent = secret => (
  (dispatch) => {
    dispatch(requestEvent());

    return api.events.find({ query: { secret } }).then((result) => {
      if (result.data) {
        dispatch(receiveEvent(result.data[0]));
      } else {
        dispatch(receiveEvent({}));
      }
      return result;
    }, (error) => {
      dispatch(receiveEvent({}));
      return error;
    });
  }
);

const startEvent = event => (
  (dispatch) => {
    dispatch(requestEvent());

    const id = store.getState().auth.user.data._id // eslint-disable-line

    return api.events.patch(
      event,
      { $push: { guests: id } },
      paramsForServer({ user: store.getState().auth.user.data }),
    ).then((response) => {
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

const stopEvent = event => (
  () => {
    api.events.removeListener('patched', updateEventCallback);
    api.events.removeListener('updated', updateEventCallback);

    return api.events
      .patch(event, { $pull: { guests: { $eq: store.getState().auth.user._id } } }) // eslint-disable-line
      .then(response => response, error => error);
  }
);

export default {
  fetchEvent,
  startEvent,
  stopEvent,
  resetEvent,
};
