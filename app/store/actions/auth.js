import api from '../../api';

const requestToken = () => (
  {
    type: 'REQUEST_TOKEN',
  }
);

const receiveToken = (token, auth) => (
  {
    type: 'RECEIVE_TOKEN',
    token,
    auth,
  }
);

const requestUser = () => (
  {
    type: 'REQUEST_USER',
  }
);

const receiveUser = user => (
  {
    type: 'RECEIVE_USER',
    user,
  }
);

const resetUser = () => (
  {
    type: 'RESET_USER',
  }
);

const updateAnonym = anonym => (
  {
    type: 'UPDATE_ANONYM',
    anonym,
  }
);

const login = credentials => (
  (dispatch) => {
    dispatch(requestToken());

    return api.auth({
      strategy: 'local',
      ...credentials,
    }).then((response) => {
      dispatch(receiveToken(response.accessToken, true));
      dispatch(requestUser());
      return api.users.find({ query: { email: credentials.email } }).then((result) => {
        dispatch(receiveUser(result.data[0]));
        return result;
      }, (error) => {
        dispatch(receiveToken('', false));
        return error;
      });
    }, (error) => {
      dispatch(receiveToken('', false));
      return error;
    });
  }
);

const fetchFBUser = credentials => (
  (dispatch) => {
    dispatch(requestUser());

    return api.users.find({ query: { email: credentials.email } })
      .then((response) => {
        if (response.data.length === 1) {
          dispatch(receiveUser(response.data[0]));
          return response;
        }
        if (response.data.length === 0) {
          return api.users.create({ ...credentials }).then((result) => {
            dispatch(receiveUser(result));
            return result;
          }, (error) => {
            dispatch(receiveUser({}));
            return error;
          });
        }
        return response;
      }, (error) => {
        dispatch(receiveUser({}));
        return error;
      });
  }
);

const auth = token => (
  (dispatch) => {
    dispatch(requestToken());

    return api.auth({
      strategy: 'facebook',
      accessToken: token,
    }).then(() => api.auth())
      .catch((error) => {
        dispatch(receiveToken('', false));
        return error;
      });
  }
);

const createUser = credentials => (
  (dispatch) => {
    dispatch(requestUser());

    return api.users.create({ ...credentials })
      .then((response) => {
        dispatch(receiveUser(response));
        return response;
      }, (error) => {
        dispatch(receiveUser({}));
        return error;
      });
  }
);

const checkToken = () => (
  (dispatch) => {
    dispatch(requestToken());

    return api.auth().then((response) => {
      dispatch(receiveToken(response.accessToken, true));
      return response;
    }, (error) => {
      dispatch(receiveToken('', false));
      return error;
    });
  }
);

const logout = () => (
  (dispatch) => {
    dispatch(requestToken());

    return api.logout().then((response) => {
      dispatch(receiveToken('', false));
      dispatch(resetUser());
      return response;
    }, error => error);
  }
);

export default {
  receiveToken,
  requestToken,
  logout,
  auth,
  login,
  createUser,
  fetchFBUser,
  checkToken,
  updateAnonym,
};
