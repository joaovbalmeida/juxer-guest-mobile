import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  logout: logoutAction,
} = actions;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text>this.props.user.name</Text>
        <Button
          title={`Mudar para ${this.props.route === 'Host' ? 'Convidado' : 'Jukebox'}`}
          onPress={() => {
            this.props.navigation.navigate('Auth');
          }}
        />
        <Button
          title="Logout"
          onPress={() => {
            this.props.logout();
            this.props.navigation.navigate('Auth');
          }}
        />
      </View>
    );
  }
}

Settings.propTypes = {
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const SettingsConnector = connect(state => (
  {
    user: state.auth.user.data,
  }
), dispatch => (
  {
    logout: () => (
      dispatch(logoutAction())
    ),
  }
))(Settings);

export default SettingsConnector;
