import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Flatlist,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Playlists extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Flatlist
          data={this.props.event.playlists}
        />
      </View>
    );
  }
}

Playlists.propTypes = {
  event: PropTypes.shape({
    playlists: PropTypes.array,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15191B',
  },
  flatlist: {
    flex: 1,
    backgroundColor: '#15191B',
  },
});

const PlaylistsConnector = connect(state => (
  {
    event: state.event.event.data,
  }
), () => (
  {
  }
))(Playlists);

export default PlaylistsConnector;
