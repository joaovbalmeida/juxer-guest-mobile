import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  fetchEvent: fetchEventAction,
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
    if (this.props.event.queue) {
      this.props.startEvent(this.props.event._id).then(() => { // eslint-disable-line
        this.props.navigation.navigate('Event');
      });
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
            this.props.fetchEvent(this.state.secret).then((result) => {
              if (result.data) {
                this.props.startEvent(result.data[0]._id).then(() => { //eslint-disable-line
                  this.props.navigation.navigate('Event');
                });
              }
            });
          }}
        />
      </View>
    );
  }
}

Checkin.propTypes = {
  fetchEvent: PropTypes.func.isRequired,
  startEvent: PropTypes.func.isRequired,
  event: PropTypes.shape({
    active: PropTypes.bool,
    queue: PropTypes.array,
  }).isRequired,
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
    fetchEvent: secret => (
      dispatch(fetchEventAction(secret))
    ),
    startEvent: event => (
      dispatch(startEventAction(event))
    ),
  }
))(Checkin);

export default CheckinConnector;
