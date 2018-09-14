import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  fetchEvent: fetchEventAction,
  startEvent: startEventAction,
  fetchPlaylist: fetchPlaylistAction,
  resetPlaylists: resetPlaylistsAction,
} = actions;

class Checkin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: '',
    };
  }

  componentDidMount() {
    if (this.props.active) this.initEvent();
  }

  initEvent() {
    this.props.resetPlaylists();
    this.props.event.playlists.forEach(playlist => this.props.fetchPlaylist(playlist));
    this.props.startEvent(this.props.event._id).then(() => { // eslint-disable-line
      this.props.navigation.navigate('Event');
    });
  }

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,marginTop: 10 }}
          onChangeText={secret => this.setState({ secret })}
          value={this.state.code}
        />
        <Button
          title="Conectar"
          onPress={() => {
            this.props.fetchEvent(this.state.secret).then((result) => {
              if (result.data) {
                this.initEvent();
              }
            });
          }}
        />
      </View>
    );
  }
}

Checkin.propTypes = {
  fetchEvent: PropTypes.func.isRequired,
  fetchPlaylist: PropTypes.func.isRequired,
  resetPlaylists: PropTypes.func.isRequired,
  startEvent: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  event: PropTypes.shape({
    active: PropTypes.bool,
    queue: PropTypes.array,
    playlists: PropTypes.array,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const CheckinConnector = connect(state => (
  {
    event: state.event.event.data,
    active: state.event.active,
  }
), dispatch => (
  {
    fetchEvent: secret => (
      dispatch(fetchEventAction(secret))
    ),
    fetchPlaylist: playlist => (
      dispatch(fetchPlaylistAction(playlist))
    ),
    resetPlaylists: () => (
      dispatch(resetPlaylistsAction())
    ),
    startEvent: event => (
      dispatch(startEventAction(event))
    ),
  }
))(Checkin);

export default CheckinConnector;
