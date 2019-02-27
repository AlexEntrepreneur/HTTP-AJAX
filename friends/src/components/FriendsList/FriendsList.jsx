import React, { Component } from 'react';

class FriendsList extends Component {
  render () {
    console.log(this.props);
    return (
      <section className="friends-list">
        {
          this.props.friends.map(friend =>
            <div key={friend.id}>{friend.name}</div>
          )
        }
      </section>
    );
  }
}

export default FriendsList;
