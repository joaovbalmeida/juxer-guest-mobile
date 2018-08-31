import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlaylistComponent from '../components/playlist';

export class Playlists extends Component {
  static navigationOptions = {
    title: 'Playlists',
    headerTintColor: '#ff005a',
    headerStyle: {
      backgroundColor: '#0E1214',
      borderBottomWidth: 1,
      borderBottomColor: '#15191B',
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.event.playlists}
          renderItem={({ item }) => (
            <PlaylistComponent
              name={item.name}
              tracks={item.tracks}
              cover={item.image}
              start={item.startDate || ''}
              end={item.endDate || ''}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={item => item._id} // eslint-disable-line
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
  list: {
    flex: 1,
    backgroundColor: '#15191B',
  },
  separator: {
    width: '100%',
    height: 1,
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
