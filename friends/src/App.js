import React, { Component } from 'react';
import axios from 'axios';
import FriendsList from './components/FriendsList/FriendsList';
import AddFriendForm from './components/AddFriendForm/AddFriendForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: null,
      error: null,
      success: null
    }
  }

  componentDidMount() {
    this.getFriendsData();
  }

  getFriendsData = () => {
    this.resetResponseState();
    axios.get('http://localhost:5000/friends')
      .then(response => this.setFriendDataToState(response.data))
      .catch(err => this.setResponseToState(null, err.message));
  }

  addFriendToData = (friend) => {
    // Reflect change on frontend before sending to server
    this.setState(currentState => ({
      friends: currentState.friends.concat(friend)
    }));

    axios.post(`http://localhost:5000/friends`, friend)
      .then(response => {
        this.setFriendDataToState(response.data);
        this.setResponseToState(response.statusText);
      })
      .catch(err => this.setResponseToState(null, err.message));
  }

  setFriendDataToState = data => {
    this.setState({ friends: data })
  }

  setResponseToState = (success, err) => {
    this.setState({
      error: err || null,
      success: success
    });
  }

  resetResponseState = () => {
    this.setState({ error: null, success: null });
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
        <AddFriendForm addFriend={this.addFriendToData}/>
      </div>
    );
  }
}

export default App;
