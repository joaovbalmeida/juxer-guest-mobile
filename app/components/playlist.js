import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';

const Playlist = ({
  name,
  tracks,
  cover,
  start,
  end,
  onPress,
}) => {
  const components = [];
  if (start) {
    components.push((
      <Text key={0} style={styles.schedule}>
        {`De: ${Moment(start).format('HH:MM DD/MM')}`}
      </Text>
    ));
  }
  if (end) {
    components.push((
      <Text key={1} style={styles.schedule}>
        {`Até: ${Moment(end).format('HH:MM DD/MM')}`}
      </Text>
    ));
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#262d31"
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.name}>
            {name}
          </Text>
          <View style={styles.info}>
            <Text style={styles.tracks}>
              {`${tracks} Músicas`}
            </Text>
            { components }
          </View>
        </View>
        <Image
          style={styles.cover}
          source={{ uri: cover }}
        />
      </View>
    </TouchableHighlight>
  );
};

Playlist.propTypes = {
  tracks: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0E1214',
  },
  leftContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
  },
  cover: {
    marginHorizontal: 15,
    height: 90,
    width: 90,
  },
  name: {
    color: 'white',
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 15,
    paddingTop: 10,
  },
  info: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  tracks: {
    color: 'white',
    fontFamily: 'Raleway',
    fontSize: 14,
  },
  schedule: {
    color: 'white',
    fontFamily: 'Raleway',
    fontSize: 14,
    paddingTop: 4,
  },
});

export default Playlist;
