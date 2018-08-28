import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
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
          style={styles.flatlist}
          data={this.props.event.queue}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <TouchableHighlight style={styles.orderButton}>
                <Text style={styles.orderText}>Pedir Música</Text>
              </TouchableHighlight>
            </View>
          )}
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
              backgroundColor="transparent"
              contentBackgroundColor="#15191B"
              parallaxHeaderHeight={380}
              stickyHeaderHeight={120}
              onChangeHeaderVisibility={visible => console.log(visible)}
              renderForeground={() => (
                <View style={styles.foregroundContainer}>
                  <Image
                    style={styles.cover}
                    source={{ uri: queue[0].cover }}
                  />
                  <Text style={styles.title}>
                    {queue[0].name}
                  </Text>
                  <Text style={styles.artist}>
                    {`${queue[0].artist} - ${queue[0].album}`}
                  </Text>
                  <Text style={styles.owner}>
                    {queue[0].owner}
                  </Text>
                </View>
              )}
              renderBackground={() => (
                <View style={styles.backgroundContainer}>
                  <Image
                    style={styles.backgroundImage}
                    blurRadius={18}
                    source={{ uri: queue[0].cover }}
                    resizeMode="cover"
                    opacity={0.3}
                  />
                </View>
              )}
              renderStickyHeader={() => (
                <View style={styles.stickyContainer}>
                  <Text style={styles.title}>
                    {queue[0].name}
                  </Text>
                  <Text style={styles.artist}>
                    {`${queue[0].artist} - ${queue[0].album}`}
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

const textStyles = {
  color: 'white',
  fontFamily: 'Raleway',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15191B',
  },
  flatlist: {
    flex: 1,
    backgroundColor: '#15191B',
    zIndex: 999999,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#15191B',
  },
  foregroundContainer: {
    height: 380,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    width: '55%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    ...textStyles,
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 20,
  },
  artist: {
    ...textStyles,
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 5,
  },
  owner: {
    fontFamily: 'Raleway',
    fontSize: 15,
    fontWeight: '600',
    color: '#FF005A',
  },
  backgroundContainer: {
    height: 380,
    width: '100%',
  },
  backgroundImage: {
    height: '100%',
    alignItems: 'center',
  },
  header: {
    height: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#15191B',
    backgroundColor: '#0E1214',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButton: {
    position: 'absolute',
    top: -15,
    backgroundColor: '#FF005A',
    height: 35,
    width: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    ...textStyles,
    fontSize: 17,
    fontWeight: '700',
  },
  stickyContainer: {
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
