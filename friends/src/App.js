import React, { Component } from 'react';
import axios from 'axios';
import FriendsList from './components/FriendsList/FriendsList';

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
    if (this.state.error) {
      return (
        <div>
          <h1>Sorry, something went wrong...</h1>
          <h3 style={{color: "red"}}>{`${this.state.error}`}</h3>
        </div>
      );
    }
    if (!this.state.friends) {
      return (
        <h1>Loading...</h1>
      );
    }
    return (
      <div className="App">
        <FriendsList friends={this.state.friends}/>
      </div>
    );
  }
}

export default App;
