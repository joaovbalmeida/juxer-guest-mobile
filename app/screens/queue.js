import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Animated,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MusicNote from '../assets/images/musicNote.png';
import AddSong from '../assets/images/addSong.png';
import Track from '../components/track';
import actions from '../store/actions';

const {
  stopEvent: stopEventAction,
} = actions;

export class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      y: new Animated.Value(0),
    };
  }

  componentWillUnmount() {
    this.props.stopEvent(this.props.event._id, false); // eslint-disable-line
  }

  renderScrollContent() {
    return (
      <View style={{ marginTop: 380 }}>
        {
          this.props.event.queue.length > 1 ? <View style={styles.header} /> : null
        }
        <View style={styles.separator} />
        { this.props.event.queue.map((item, index) => {
          if (index === 0) return null;
          return (
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
          );
        })}
      </View>
    );
  }

  render() {
    const { queue } = this.props.event;
    const opacity = this.state.y.interpolate({
      inputRange: [0, 130, 260],
      outputRange: [1, 0.1, 0],
      extrapolate: 'clamp',
    });
    const height = this.state.y.interpolate({
      inputRange: [0, 260],
      outputRange: [380, 120],
      extrapolateRight: 'clamp',
    });
    const translateY = this.state.y.interpolate({
      inputRange: [0, 260],
      outputRange: [0, -110],
      extrapolate: 'clamp',
    });
    if (this.props.event.queue.length === 0) {
      return (
        <View style={styles.emptyQueue}>
          <StatusBar barStyle="light-content" />
          <Image
            source={MusicNote}
            style={styles.musicNote}
          />
          <Text style={styles.emptyTitle}>
            Não há músicas na fila
          </Text>
          <Text style={styles.emptySubtitle}>
            Adicione uma música ou espere uma entrar na fila.
          </Text>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Playlists')}>
            <Text>pedir musica</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.flatlist}
          scrollEventThrottle={16}
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
              style={{ ...styles.cover, opacity, transform: [{ translateY }] }}
              source={{ uri: queue[0].cover }}
            />
            <Animated.Text style={{ ...styles.title, transform: [{ translateY }] }}>
              {queue[0].name}
            </Animated.Text>
            <Animated.Text style={{ ...styles.artist, transform: [{ translateY }] }}>
              {`${queue[0].artist} - ${queue[0].album}`}
            </Animated.Text>
            <Animated.Text style={{ ...styles.owner, opacity, transform: [{ translateY }] }}>
              {queue[0].owner}
            </Animated.Text>
            <TouchableHighlight
              underlayColor="#9d0037"
              style={styles.orderButton}
              onPress={() => this.props.navigation.navigate('Playlists')}
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
  stopEvent: PropTypes.func.isRequired,
  event: PropTypes.shape({
    queue: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

const textStyles = {
  color: 'white',
  fontFamily: 'Raleway',
};

const styles = StyleSheet.create({
  emptyQueue: {
    flex: 1,
    backgroundColor: '#15191B',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
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
    backgroundColor: '#0E1214',
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
  emptyTitle: {
    ...textStyles,
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 20,
  },
  emptySubtitle: {
    ...textStyles,
    paddingTop: 10,
  },
  musicNote: {
    height: 128,
    width: 128,
  },
});

const QueueConnector = connect(state => (
  {
    event: state.event.event.data,
  }
), dispatch => (
  {
    stopEvent: (event, reset) => (
      dispatch(stopEventAction(event, reset))
    ),
  }
))(Queue);

export default QueueConnector;
