import React, {  Component } from 'react';
import { string, number } from 'prop-types';
import './FriendCard.css';

class FriendCard extends Component {

  onDeleteBtnClick = (id) => {
    this.props.deleteFriend(id);
  }

  render () {
    return (
      <div className="card friend-card">
        <p>{this.props.name}</p>
        <p>{this.props.age}</p>
        <p>{this.props.email}</p>
        <button
          className="delete-btn"
          onClick={() => this.onDeleteBtnClick(this.props.id)}
        >DELETE</button>
      </div>
    );
  }
}

FriendCard.propTypes = {
  name: string.isRequired,
  age: number.isRequired,
  email: string.isRequired
}

export default FriendCard;
