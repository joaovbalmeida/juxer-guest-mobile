import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Song from '../components/song';

export class Songs extends Component {
  static navigationOptions = {
    title: 'Músicas',
    headerTintColor: '#ff005a',
    headerStyle: {
      backgroundColor: '#0E1214',
      borderBottomWidth: 1,
      borderBottomColor: '#15191B',
    },
  }

  render() {
    console.log(this.props.navigation.state.params.songs);
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.navigation.state.params.songs}
          renderItem={({ item }) => (
            <Song
              name={item.name}
              artist={item.artist}
              cover={item.cover}
              album={item.album}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={item => item._id} // eslint-disable-line
        />
      </View>
    );
  }
}

Songs.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        songs: PropTypes.array,
      }).isRequired,
    }).isRequired,
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

const SongsConnector = connect(() => (
  {
  }
), () => (
  {
  }
))(Songs);

export default SongsConnector;
