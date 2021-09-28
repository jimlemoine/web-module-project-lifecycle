import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    user: {},
    followers: []
  }
  
  componentDidMount() {
    axios.get(`https://api.github.com/users/jimlemoine`)
    .then((resp) => {
      this.setState({
        ...this.state,
        user: resp.data
      })
    }
    );
    axios.get('https://api.github.com/users/jimlemoine/followers')
    .then((resp) => {
      this.setState({
        ...this.state,
        followers: resp.data
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Our GitHub Profile and Followers</h2>
        </header>
        <div className='card'>
          <img src={this.state.user.avatar_url} alt='Jims headshot'/>
          <div className='card-text'>
            <h3>My Name: {this.state.user.name}</h3>
            <p>Username: {this.state.user.login}</p>
            <p>Location: {this.state.user.location}</p>
            <p>Profile: 
              <a href={this.state.user.url}>Github Page</a>
            </p>
            <p>Follower Count: {this.state.user.followers}</p>
            <p>Following Count: {this.state.user.following}</p>
            <p>Bio: {this.state.user.bio}</p>
          </div>
        </div>
        <div className='followers'>
          {this.state.followers.map((follower, index) => {
            return (
              <div className='follower'>
                <img src={follower.avatar_url} key={index} alt='Follower Headshot' />
                <div className='follower-text'>
                  <h4>Username: {follower.login}</h4>
                  <p>Location: {follower.location}</p>
                </div>
              </div>)
          })}
        </div>
      </div>
    );
  }
}

export default App;
