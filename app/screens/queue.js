import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import Track from '../components/track';
import actions from '../store/actions';

const {
  createUser: createUserAction,
} = actions;

export class Queue extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    const { queue } = this.props.event;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={styles.playlists}
          data={this.props.event.queue}
          scrollEventThrottle={1}
          renderItem={({ item, index }) => (
            <Track
              order={(index + 1).toString()}
              name={item.name}
              artist={item.artist}
              cover={item.cover}
              owner={item.owner}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={item => item._id} // eslint-disable-line
          renderScrollComponent={() => (
            <ParallaxScrollView
              backgroundColor="clear"
              contentBackgroundColor="clear"
              parallaxHeaderHeight={340}
              stickyHeaderHeight={100}
              renderForeground={() => (
                <View style={styles.foregroundContainer}>
                  <Image
                    style={styles.cover}
                    source={{ uri: queue[0].cover }}
                  />
                </View>
              )}
              renderBackground={() => (
                <Image
                  style={styles.backgroundImage}
                  blurRadius={10}
                  source={{ uri: queue[0].cover }}
                  resizeMode="cover"
                  opacity={0.1}
                />
              )}
              renderStickyHeader={() => (
                <View style={styles.stickyContainer}>
                  <Text>{queue[0].name}</Text>
                  <Text>
                    {queue[0].artist}
                    {''}
                    -
                    {''}
                    {queue[0].album}
                  </Text>
                </View>
              )}
            />
          )}
        />
      </View>
    );
  }
}

Queue.propTypes = {
  event: PropTypes.shape({
    queue: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15191B',
  },
  playlists: {
    flex: 1,
    backgroundColor: '#15191B',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#15191B',
  },
  foregroundContainer: {
    height: 340,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyContainer: {
    height: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  cover: {
    aspectRatio: 1,
    alignSelf: 'center',
  },
});

const QueueConnector = connect(state => (
  {
    event: state.event.event.data,
  }
), dispatch => (
  {
    createUser: credentials => (
      dispatch(createUserAction(credentials))
    ),
  }
))(Queue);

export default QueueConnector;
