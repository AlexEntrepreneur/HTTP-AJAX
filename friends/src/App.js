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

  apiURL = 'http://localhost:5000/friends';

  componentDidMount() {
    this.getFriendsData();
  }

  getFriendsData = () => {
    this.resetSuccessErrorState();
    axios.get(this.apiURL)
      .then(response => this.setFriendDataToState(response.data))
      .catch(err => this.setSuccessErrorToState(null, err.message));
  }

  addFriendToData = (friend) => {
    // Reflect change on frontend before sending to server
    this.setState(currentState => ({
      friends: currentState.friends.concat(friend)
    }));

    axios.post(this.apiURL, friend)
      .then(response => {
        this.setFriendDataToState(response.data);
        this.setSuccessErrorToState(response.statusText);
        setTimeout(() => this.resetSuccessErrorState(), 3000);
      })
      .catch(err => {
        this.setSuccessErrorToState(null, 'failed to add friend');
        setTimeout(() => window.location.reload(), 1000);
      });
  }

  deleteFriendFromData = (id) => {
    const friendsWithoutDeletedFriend = this.state.friends.filter(friend =>
      friend.id !== id
    );

    this.setState({ friends: friendsWithoutDeletedFriend });

    axios.delete(`${this.apiURL}/${id}`)
      .then(response => {
        this.setFriendDataToState(response.data);
        this.setSuccessErrorToState(response.statusText);
        setTimeout(() => this.resetSuccessErrorState(), 3000);
    })
      .catch(err => {
        this.setSuccessErrorToState(null, 'failed to delete friend');
        setTimeout(() => window.location.reload(), 1000);
      });
  }

  setFriendDataToState = data => {
    this.setState({ friends: data });
  }

  setSuccessErrorToState = (success, err) => {
    this.setState({
      error: err || null,
      success: success
    });
  }

  resetSuccessErrorState = () => {
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
        <FriendsList
          friends={this.state.friends}
          deleteFriendFunction={this.deleteFriendFromData}
        />
        <AddFriendForm addFriend={this.addFriendToData}/>
      </div>
    );
  }
}

export default App;
