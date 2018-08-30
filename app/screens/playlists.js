import React, { Component } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  createUser: createUserAction,
  login: loginAction,
} = actions;

export class Register extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      error: '',
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    this.setState({
      error: '',
    });
    this.props.createUser({
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }).then((response) => {
      if (response.message && response.code.toString().startsWith('4')) {
        this.setState({
          error: 'Não foi possivel criar usuário',
        });
      } else {
        this.props.login({
          email: this.state.email,
          password: this.state.password,
        }).then((result) => {
          if (result.message && result.code.toString().startsWith('4')) {
            this.setState({
              error: 'Não foi possivel fazer login',
            });
          } else if (result.data.length) {
            this.props.navigation.navigate('App');
          }
        });
      }
    });
  }

  render() {
    return (
      <View>
        <Text>
          {this.state.error}
        </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title="Register"
          onPress={this.handleRegister}
        />
      </View>
    );
  }
}

Register.propTypes = {
  createUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const RegisterConnector = connect(() => (
  {
  }
), dispatch => (
  {
    createUser: credentials => (
      dispatch(createUserAction(credentials))
    ),
    login: credentials => (
      dispatch(loginAction(credentials))
    ),
  }
))(Register);

export default RegisterConnector;
