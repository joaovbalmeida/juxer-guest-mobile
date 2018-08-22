import React, { Component } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import actions from '../store/actions';

const {
  auth: authAction,
  fetchFBUser: fetchFBUserAction,
  login: loginAction,
} = actions;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.handleFBLogin = this.handleFBLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({ error: '' });
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      console.log(response);
      if (response.message && response.code.toString().startsWith('4')) {
        this.setState({
          error: 'Credenciais inválidas',
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  graphCallback(error, result) {
    if (error) {
      this.setState({ error });
    } else {
      AccessToken.getCurrentAccessToken().then((token) => {
        console.log(token, result);
      }, e => this.setState({ error: e }));
    }
  }

  handleFBLogin() {
    this.setState({ error: '' });

    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
      if (result.isCancelled) {
        this.setState({ error: 'Login cancelled' });
      } else {
        const graphRequest = new GraphRequest(
          '/me',
          {
            parameters: {
              fields: {
                string: 'email,name,first_name,middle_name,last_name',
              },
            },
          },
          this.graphCallback,
        );
        new GraphRequestManager().addRequest(graphRequest).start();
      }
    }, error => this.setState({ error: error.toString() }));
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
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title="Login"
          onPress={this.handleLogin}
        />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate('Register')}
        />
        <Button
          title="FacebookLogin"
          onPress={this.handleFBLogin}
        />
      </View>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  fetchFBUser: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const LoginConnector = connect(() => (
  {
  }
), dispatch => (
  {
    auth: token => (
      dispatch(authAction(token))
    ),
    fetchFBUser: credentials => (
      dispatch(fetchFBUserAction(credentials))
    ),
    login: credentials => (
      dispatch(loginAction(credentials))
    ),
  }
))(Login);

export default LoginConnector;
