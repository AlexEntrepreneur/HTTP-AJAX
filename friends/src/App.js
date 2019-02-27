import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: null,
      error: null
    }
  }

  componentDidMount() {
    this.getFriendsData();
  }

  getFriendsData = () => {
    this.resetErrorState();
    axios.get('http://localhost:5000/friends')
      .then(response => this.setFriendDataToState(response.data))
      .catch(err => this.setErrorToState(err.message));
  }

  setFriendDataToState = data => {
    this.setState({ friends: data })
  }

  setErrorToState = err => {
    this.setState({ error: err });
  }

  resetErrorState = () => {
    this.setState({ error: null });
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
