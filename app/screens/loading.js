import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  checkToken: checkTokenAction,
} = actions;

class Loading extends Component {
  componentDidMount() {
    this.props.checkToken().then((response) => {
      this.props.navigation.navigate(response.code === 401 ? 'Auth' : 'App');
    }, (error) => {
      console.log(error);
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Juxer
        </Text>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

Loading.propTypes = {
  checkToken: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const LoadingConnector = connect(() => (
  {
  }
), dispatch => (
  {
    checkToken: () => (
      dispatch(checkTokenAction())
    ),
  }
))(Loading);

export default LoadingConnector;
