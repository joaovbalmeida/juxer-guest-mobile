import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  Text,
  ImageBackground,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddSong from '../assets/images/addSong.png';
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
      y: new Animated.Value(0),
    };
  }

  renderScrollContent() {
    return (
      <View style={{ marginTop: 400 }}>
        <View style={styles.header} />
        <View style={styles.separator} />
        { this.props.event.queue.map((item, index) => (
          <View
            key={item._id} //eslint-disable-line
          >
            <Track
              order={(index + 1).toString()}
              name={item.name}
              artist={item.artist}
              cover={item.cover}
              owner={item.owner}
            />
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    );
  }

  render() {
    const { queue } = this.props.event;
    const opacity = this.state.y.interpolate({
      inputRange: [0, 140, 280],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });
    const height = this.state.y.interpolate({
      inputRange: [0, 280],
      outputRange: [400, 120],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          style={styles.flatlist}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.y } } }],
          )}
        >
          {this.renderScrollContent()}
        </ScrollView>
        <Animated.View style={{ ...styles.foregroundContainer, height }}>
          <ImageBackground
            style={styles.backgroundImage}
            blurRadius={18}
            source={{ uri: queue[0].cover }}
            resizeMode="cover"
            opacity={0.3}
          >
            <Animated.Image
              style={{ ...styles.cover, opacity }}
              source={{ uri: queue[0].cover }}
            />
            <Text style={styles.title}>
              {queue[0].name}
            </Text>
            <Text style={styles.artist}>
              {`${queue[0].artist} - ${queue[0].album}`}
            </Text>
            <Animated.Text style={{ ...styles.owner, opacity }}>
              {queue[0].owner}
            </Animated.Text>
            <TouchableHighlight
              underlayColor="#9d0037"
              style={styles.orderButton}
              onPress={() => console.log(1)}
            >
              <Image source={AddSong} style={styles.add} />
            </TouchableHighlight>
          </ImageBackground>
        </Animated.View>
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
  foregroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#15191B',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
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
  header: {
    height: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#15191B',
    backgroundColor: '#0E1214',
  },
  orderButton: {
    position: 'absolute',
    bottom: -18,
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
