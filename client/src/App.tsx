import React from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import Imagegrid from './components/Imagegrid';
import { userInterface } from './interfaces/userInterface';
import Start from './components/Start'

class App extends React.Component {
  constructor(props: userInterface) {
    super(props);

    this.state = {
      userId: 0,
      prolificId: "",
      progress: 0
    }

    this.updateState = this.updateState.bind(this)
  }

  updateState(u: userInterface) {
    this.setState({
      userId: u.userId,
      prolificId: u.prolificId,
      progress: u.progress
    })
  }

  render() {
    return (
      <div className="App">
          <Start updateParentState={this.updateState} />
          <Sidebar points={210} total={15} current={12} />
          <Imagegrid />
      </div>
    );
  }
}

export default App;
