import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const Song = ({
  name,
  artist,
  album,
  cover,
}) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      resizeMode="contain"
      source={{ uri: cover }}
    />
    <View style={styles.labels}>
      <Text style={styles.name}>
        {name}
      </Text>
      <Text style={styles.artist}>
        {`${artist} - ${album}`}
      </Text>
    </View>
  </View>
);

Song.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0E1214',
  },
  image: {
    height: 65,
    width: 65,
  },
  order: {
    color: 'white',
    fontFamily: 'Raleway',
    fontSize: 20,
    width: 50,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  name: {
    color: 'white',
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 15,
    paddingBottom: 2,
  },
  artist: {
    color: 'white',
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    paddingBottom: 6,
  },
  owner: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    color: '#ff005a',
  },
  rightSection: {
    marginLeft: 8,
    marginRight: 5,
  },
});

export default Song;
