import React, { Component } from 'react';
import FriendCard from '../FriendCard/FriendCard';

class FriendsList extends Component {
  render () {
    return (
      <section className="friends-list">
        {
          this.props.friends.map((friend, index) =>
            <FriendCard
              key={ friend.id || index + 1 /* prevents duplicate key */ }
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
