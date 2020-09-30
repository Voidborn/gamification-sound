import React from 'react';
import './App.css';


import { User } from './interfaces/userInterface';
import Start from './components/Start'
import Imagerating from './components/Imagerating'

class App extends React.Component<{},User> {
  constructor(props: User) {
    super(props);

    this.state = {
      userId: 0,
      prolificId: "",
      progress: 0
    }

    this.updateState = this.updateState.bind(this)
  }

  updateState(u: User) {
    this.setState({
      userId: u.userId,
      prolificId: u.prolificId,
      progress: u.progress
    })
  }

  generateContent () {
    switch (this.state.progress) {
      case 0:
        return <Start updateParentState={this.updateState} />
      case 1:
        return <Imagerating userId={this.state.userId}/>
    }
  }

  render() {
    return (
      <div className="App">
        {this.generateContent()}
      </div>
    );
  }
}

export default App;
