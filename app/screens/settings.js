import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';
import Placeholder from '../assets/images/profilePlaceholder.jpg';

const {
  updateAnonym: updateAnonymAction,
} = actions;

export class Settings extends Component {
  render() {
    const { name, picture } = this.props.user;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <ImageBackground
            style={styles.backgroundImage}
            blurRadius={18}
            resizeMode="cover"
            opacity={0.3}
            source={picture ? { uri: picture } : null}
          >
            <Image
              source={picture ? { uri: picture } : Placeholder}
              style={styles.picture}
            />
            <Text style={styles.name}>
              {name}
            </Text>
          </ImageBackground>
          <View style={styles.emptyRow} />
          <View style={styles.anonymRow}>
            <Text style={styles.label}>
              Modo Anónimo
            </Text>
            <Switch
              value={this.props.anonym}
              onValueChange={anonym => this.props.updateAnonym(anonym)}
              onTintColor="#ff005a"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const row = {
  flexDirection: 'row',
  height: 60,
  width: '100%',
  backgroundColor: '#0E1214',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15191B',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#15191B',
  },
  emptyRow: {
    height: 40,
    width: '100%',
  },
  backgroundImage: {
    height: 280,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 10,
  },
  name: {
    fontFamily: 'Raleway',
    fontSize: 17,
    fontWeight: '700',
    color: '#ff005a',
    paddingTop: 25,
  },
  anonymRow: {
    ...row,
  },
  label: {
    fontFamily: 'Raleway',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

Settings.propTypes = {
  updateAnonym: PropTypes.func.isRequired,
  anonym: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const SettingsConnector = connect(state => (
  {
    event: state.event.event.data,
    user: state.auth.user.data,
    anonym: state.auth.anonym,
  }
), dispatch => (
  {
    updateAnonym: anonym => (
      dispatch(updateAnonymAction(anonym))
    ),
  }
))(Settings);

export default SettingsConnector;
