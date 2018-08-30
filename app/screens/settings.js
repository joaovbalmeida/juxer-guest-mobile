import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';
import Placeholder from '../assets/images/profilePlaceholder.jpg';

const {
  updateAnonym: updateAnonymAction,
  logout: logoutAction,
  clearEvent: clearEventAction,
} = actions;

export class Settings extends Component {
  leaveEvent() {
    Promise.resolve(this.props.clearEvent(this.props.event._id)) // eslint-disable-line
      .then(() => {
        this.props.navigation.navigate('Checkin');
      });
  }

  logout() {
    Promise.all([
      this.props.event._id ? this.props.clearEvent(this.props.event._id) : null, //eslint-disable-line
      this.props.logout(),
    ]).then(() => {
      this.props.navigation.navigate('Auth');
    });
  }

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
          <View style={styles.emptyRow} />
          <View style={styles.exitRow}>
            {
              this.props.event._id // eslint-disable-line
                ? (
                  <View>
                    <TouchableHighlight
                      underlayColor="#1e2326"
                      style={styles.leaveEventRow}
                      onPress={() => this.leaveEvent()}
                    >
                      <Text style={styles.label}>
                        Sair do Evento
                      </Text>
                    </TouchableHighlight>
                    <View style={styles.separator} />
                  </View>
                )
                : null
              }
            <TouchableHighlight
              underlayColor="#1e2326"
              style={styles.logoutRow}
              onPress={() => this.logout()}
            >
              <Text style={styles.label}>
                Logout
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const row = {
  flexDirection: 'row',
  height: 50,
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
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#15191B',
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
  leaveEventRow: {
    ...row,
    justifyContent: 'center',
  },
  logoutRow: {
    ...row,
    justifyContent: 'center',
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
  logout: PropTypes.func.isRequired,
  clearEvent: PropTypes.func.isRequired,
  anonym: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  event: PropTypes.shape({
    active: PropTypes.bool,
    _id: PropTypes.string,
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
    logout: () => (
      dispatch(logoutAction())
    ),
    clearEvent: event => (
      dispatch(clearEventAction(event))
    ),
  }
))(Settings);

export default SettingsConnector;
