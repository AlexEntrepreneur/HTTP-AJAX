import React, { Component } from 'react';
import FriendCard from '../FriendCard/FriendCard';

class FriendsList extends Component {
  render () {
    return (
      <section className="friends-list">
        {
          this.props.friends.map(friend =>
            <FriendCard
              key={friend.id}
              name={friend.name}
              age={friend.age}
              email={friend.email}
            />
          )
        }
      </section>
    );
  }
}

export default FriendsList;
