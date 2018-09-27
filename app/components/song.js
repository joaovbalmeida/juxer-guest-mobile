import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

const Song = ({
  name,
  artist,
  album,
  cover,
  onPress,
}) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor="#262d31"
  >
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: cover }}
      />
      <View style={styles.labels}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.artist}>
          {`${artist} - ${album}`}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
);

Song.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0E1214',
    paddingHorizontal: 10,
  },
  image: {
    height: 60,
    width: 60,
  },
  labels: {
    flex: 1,
    paddingLeft: 10,
  },
  name: {
    color: 'white',
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 15,
    paddingBottom: 2,
  },
  artist: {
    paddingTop: 5,
    color: 'white',
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 13,
    paddingBottom: 6,
  },
});

export default Song;
