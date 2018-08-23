import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  createUser: createUserAction,
  login: loginAction,
} = actions;

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export class Register extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', ''),
    headerStyle: {
      backgroundColor: '#0E1214',
      borderBottomWidth: 1,
      borderBottomColor: '#15191B',
    },
    headerTintColor: '#ff005a',
    headerTitleStyle: {
      fontFamily: 'Raleway',
      fontWeight: '800',
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      title: this.props.event.name,
    });
  }

  handleRegister() {
    this.setState({
      error: '',
    });
    this.props.createUser({
      email: this.state.email,
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
          }
        });
      }
    });
  }

  render() {
    console.log(this.props.event);
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
  event: PropTypes.shape({
    queue: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
  }).isRequired,
};

const RegisterConnector = connect(state => (
  {
    event: state.event.event.data,
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