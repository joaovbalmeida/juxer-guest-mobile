import api from '../../api';

const requestPlaylists = () => (
  {
    type: 'REQUEST_PLAYLISTS',
  }
);

const receivePlaylists = playlists => (
  {
    type: 'RECEIVE_PLAYLISTS',
    playlists,
  }
);

const resetPlaylists = () => (
  {
    type: 'RESET_PLAYLISTS',
  }
);

const fetchPlaylists = id => (
  (dispatch) => {
    dispatch(requestPlaylists());
    return api.playlists.find({ query: { event: id } }).then((response) => {
      dispatch(receivePlaylists(response.data));
      return response;
    }, (error) => {
      dispatch(receivePlaylists([]));
      return error;
    }, error => error);
  }
);

export default {
  fetchPlaylists,
  resetPlaylists,
};
