import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const Playlist = ({
  name,
  tracks,
  cover,
  start,
  end,
}) => (
  <View style={styles.container}>
    <View style={styles.top}>
      <View>
        <Text style={styles.name}>
          {name}
        </Text>
        <Text>
          {`${tracks} Músicas`}
        </Text>
      </View>
      <Image
        style={styles.cover}
        source={{ uri: cover }}
      />
    </View>
    <View style={styles.bottom}>
      <View style={styles.startContainer}>
        <Text>
          {start}
        </Text>
      </View>
      <View style={styles.endContainer}>
        <Text>
          {end}
        </Text>
      </View>
    </View>
  </View>
);

Playlist.propTypes = {
  tracks: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0E1214',
  },
  top: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
  },
  bottom: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
  },
  cover: {
    height: 60,
    width: 60,
  },
  name: {
    color: 'white',
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 15,
    paddingBottom: 2,
  },
});

export default Playlist;
