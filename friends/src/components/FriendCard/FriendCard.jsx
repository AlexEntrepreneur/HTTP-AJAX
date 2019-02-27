import React, {  Component } from 'react';
import { string, number } from 'prop-types';

class FriendCard extends Component {
  render () {
    return (
      <div className="card friend-card">
        <p>{this.props.name}</p>
        <p>{this.props.age}</p>
        <p>{this.props.email}</p>
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
