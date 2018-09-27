import { paramsForServer } from 'feathers-hooks-common';

import api from '../../api';
import store from '../index';

const requestEvent = () => (
  {
    type: 'REQUEST_EVENT',
  }
);

const receiveEvent = (event, active) => (
  {
    type: 'RECEIVE_EVENT',
    event,
    active,
  }
);

const resetEvent = () => (
  {
    type: 'RESET_EVENT',
  }
);

const updateEventCallback = (data) => {
  store.dispatch(receiveEvent(data, true));
};

const requestTrack = track => (
  () => (
    api.events.patch(
      store.getState().event.event.data._id, // eslint-disable-line
      { $addToSet: { queue: track } },
      paramsForServer({ user: store.getState().auth.user.data }),
    ).then(response => response, error => error)
  )
);

const fetchEvent = secret => (
  () => api.events.find({ query: { secret } }).then(result => result, error => error)
);

const startEvent = event => (
  (dispatch) => {
    dispatch(requestEvent());

    const id = store.getState().auth.user.data._id // eslint-disable-line
    return api.events.patch(event, { $addToSet: { guests: id } }, paramsForServer({
      user: store.getState().auth.user.data,
    })).then((response) => {
      dispatch(receiveEvent(response, true));

      api.events.on('patched', updateEventCallback);
      api.events.on('updated', updateEventCallback);

      return response;
    }, (error) => {
      if (error.code === 409) {
        return api.events.get(
          event,
          paramsForServer({ user: store.getState().auth.user.data }),
        ).then((response) => {
          dispatch(receiveEvent(response, true));

          api.events.on('patched', updateEventCallback);
          api.events.on('updated', updateEventCallback);

          return response;
        }, (err) => {
          dispatch(receiveEvent({}, false));
          return err;
        });
      }
      dispatch(receiveEvent({}, false));
      return error;
    });
  }
);

const stopEvent = (event, reset) => (
  (dispatch) => {
    if (reset) dispatch(resetEvent());

    api.events.removeListener('patched', updateEventCallback);
    api.events.removeListener('updated', updateEventCallback);

    return api.events
      .patch(
        event,
        { $pull: { guests: { $eq: store.getState().auth.user._id } } }, // eslint-disable-line
        paramsForServer({ user: store.getState().auth.user.data }),
      )
      .then(response => response, error => error);
  }
);

export default {
  fetchEvent,
  startEvent,
  stopEvent,
  requestTrack,
  resetEvent,
};
