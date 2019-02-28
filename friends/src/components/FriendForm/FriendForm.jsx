import React from 'react';
import './FriendForm.css';

class FriendForm extends React.Component {
  state = {
    name: '',
    age: 1,
    email: '',
    id: null,
    error: null
  }

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
      this.props.addFriend(friend);
    }

    else if (friendFormIsFilled && this.state.id) {
      this.clearFriendForm();
      const friend = { name, age: Number(age), email, id };
      this.props.editFriend(friend);
    }
    else {
      this.setState({ error: true });

      setTimeout(() => {
        // Display error message for N seconds
        this.setState({ error: null });
      }, 2000);
    }
  }

  clearFriendForm = () => {
    this.setState({ age: 1, name: '', email: ''});
  }

  render () {
    return (
      <div className="friend-form-container">
        {
          this.state.error && <p style={{color: "red"}}>please try again</p>
        }
        <form onSubmit={(e) => this.onFriendFormSubmit(e)} className="friend-form">
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={(e) => this.onFormInputChange(e, e.target.name)}
          />
          <input
            type="number"
            name="age"
            placeholder="age"
            value={this.state.age}
            onChange={(e) => this.onFormInputChange(e, e.target.name)}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={(e) => this.onFormInputChange(e, e.target.name)}
          />
          <button type="submit">Add Friend</button>
        </form>
      </div>
    );
  }
}

export default FriendForm;
