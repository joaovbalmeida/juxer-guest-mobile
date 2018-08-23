import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  startEvent: startEventAction,
} = actions;

class Checkin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: '',
    };
  }

  componentDidMount() {
    if (this.props.event) {
      this.props.navigation.navigate('Event');
    }
  }

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,marginTop: 10 }}
          onChangeText={secret => this.setState({ secret })}
          value={this.state.code}
        />
        <Button
          title="Conectar"
          onPress={() => {
            this.props.startEvent(this.state.secret).then(() => {
              this.props.navigation.navigate('Event');
            });
          }}
        />
      </View>
    );
  }
}

Checkin.propTypes = {
  startEvent: PropTypes.func.isRequired,
  event: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const CheckinConnector = connect(state => (
  {
    event: state.event.event.data,
  }
), dispatch => (
  {
    startEvent: secret => (
      dispatch(startEventAction(secret))
    ),
  }
))(Checkin);

export default CheckinConnector;
