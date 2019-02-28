import React, { Component } from 'react';
import axios from 'axios';
import FriendsList from './components/FriendsList/FriendsList';
import FriendForm from './components/FriendForm/FriendForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: null,
      error: null,
      success: null,
      name: '',
      age: 1,
      email: '',
      id: null,
      formError: null
    }
  }

  apiURL = 'http://localhost:5000/friends';

  componentDidMount() {
    this.getFriendsData();
  }

  //====== API REQUEST CODE ======//

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

  editFriendData = (friend) => {
    const friendsWithEditedFriend = this.state.friends.map(fr => {
      if (friend.id === fr.id) {
        return friend;
      }
      return fr;
    });

    // Reflect change on frontend before sending to server
    this.setState({
      friends: friendsWithEditedFriend,
      currentFriend: null
    });

    axios.put(`${this.apiURL}/${friend.id}`, friend)
      .then(response => {
        this.setFriendDataToState(response.data);
        this.setSuccessErrorToState(response.statusText);
        setTimeout(() => this.resetSuccessErrorState(), 3000);
      })
      .catch(err => {
        this.setSuccessErrorToState(null, 'failed to edit friend');
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

  //====== STATE UTILITY FUNCTIONS ======//

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

  getCurrentFriend = (friend) => {
    // Get the current friend from edit button click callback
    this.setState({
      ...friend
    });
  }

  //====== FORM HANDLING CODE ======//

  onFormInputChange = (event, fieldName) => {
    event.persist();
    this.setState({ [fieldName]: event.target.value })
  }

  onFriendFormSubmit = (event) => {
    event.preventDefault();
    const { name, age, id, email } = this.state;
    const friendFormIsFilled = name && email && age > 1;

    if (friendFormIsFilled && !this.state.id) {
      this.clearFriendForm();
      const friend = { name, age: Number(age), email };
      this.addFriendToData(friend);
    }

    else if (friendFormIsFilled && this.state.id) {
      this.clearFriendForm();
      const friend = { name, age: Number(age), email, id };
      this.editFriendData(friend);
    }
    else {
      this.setState({ formError: true });

      setTimeout(() => {
        // Display error message for N seconds
        this.setState({ formError: null });
      }, 2000);
    }
  }

  clearFriendForm = () => {
    this.setState({ age: 1, name: '', email: '', id: null});
  }

  //====== RENDER ======//

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Sorry, something went wrong...</h1>
          <h3 className="danger-text">{`${this.state.error}`}</h3>
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
          getCurrentFriendFunction={this.getCurrentFriend}
        />
        <FriendForm
          clearFriendForm={this.clearFriendForm}
          onFormInputChange={this.onFormInputChange}
          onFriendFormSubmit={this.onFriendFormSubmit}
          name={this.state.name}
          age={this.state.age}
          email={this.state.email}
          id={this.state.id}
          formError={this.state.formError}
        />
      </div>
    );
  }
}

export default App;
