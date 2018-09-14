import api from '../../api';

const requestPlaylist = () => (
  {
    type: 'REQUEST_PLAYLIST',
  }
);

const receivePlaylist = playlist => (
  {
    type: 'RECEIVE_PLAYLIST',
    playlist,
  }
);

const resetPlaylists = () => (
  {
    type: 'RESET_PLAYLISTS',
  }
);

const fetchPlaylist = playlist => (
  (dispatch) => {
    dispatch(requestPlaylist());
    return api.playlists.get(playlist).then((response) => {
      dispatch(receivePlaylist(response));
      return response;
    }, (error) => {
      dispatch(receivePlaylist(false));
      return error;
    }, error => error);
  }
);

export default {
  fetchPlaylist,
  resetPlaylists,
};
