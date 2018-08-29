import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import AddSong from '../assets/images/addSong.png';
import Settings from '../assets/images/settings.png';
import Track from '../components/track';
import actions from '../store/actions';

const {
  createUser: createUserAction,
} = actions;

export class Queue extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {
      scroll: new Animated.Value(0),
    };
  }

  render() {
    const { queue } = this.props.event;
    const imageOpacity = this.state.scroll.interpolate({
      inputRange: [0, 130, 260],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={styles.flatlist}
          data={this.props.event.queue}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          )}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <TouchableHighlight
                underlayColor="#9d0037"
                style={styles.orderButton}
                onPress={() => console.log(1)}
              >
                <Image source={AddSong} style={styles.add} />
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
              parallaxHeaderHeight={400}
              stickyHeaderHeight={120}
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
              renderFixedHeader={() => (
                <View style={styles.fixedContainer}>
                  <View style={styles.side} />
                  <View style={{ ...styles.center, opacity: imageOpacity }}>
                    <Text style={styles.headerTitle}>
                      {queue[0].name}
                    </Text>
                    <Text style={styles.headerArtist}>
                      {queue[0].artist}
                    </Text>
                  </View>
                  <View styles={styles.side}>
                    <TouchableOpacity
                      style={styles.settingsButton}
                      onPress={() => console.log(2)}
                    >
                      <Image source={Settings} style={styles.settings} />
                    </TouchableOpacity>
                  </View>
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
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#15191B',
  },
  foregroundContainer: {
    height: 400,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    width: '55%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 20,
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
    height: 400,
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
    top: -10,
    backgroundColor: '#FF005A',
    height: 35,
    width: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    height: 24,
    width: 24,
  },
  fixedContainer: {
    height: 120,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  side: {
    width: 50,
    height: '100%',
  },
  center: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    height: 30,
    width: 30,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settings: {
    height: 24,
    width: 24,
  },
  headerTitle: {
    ...textStyles,
    fontSize: 15,
    fontWeight: '700',
    paddingTop: 12,
  },
  headerArtist: {
    ...textStyles,
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 5,
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
