import React, { Component } from 'react';
import FriendCard from '../FriendCard/FriendCard';
import './FriendsList.css';

class FriendsList extends Component {
  render () {
    return (
      <section className="friends-list">
        {
          this.props.friends.length === 0 && <h2>Add a friend to your friends list below.</h2>
        }
        {
          this.props.friends.map((friend, index) =>
            <FriendCard
              key={ friend.id || index + 1 /* prevents duplicate key */ }
              name={friend.name}
              age={friend.age}
              email={friend.email}
              id={friend.id}
              deleteFriend={this.props.deleteFriendFunction}
              getCurrentFriend={this.props.getCurrentFriendFunction}
            />
          )
        }
      </section>
    );
  }
}

export default FriendsList;
