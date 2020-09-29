import React from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import Imagegrid from './components/Imagegrid';
import { userInterface } from './interfaces/userInterface';

import register from './api/api';

class App extends React.Component {
  constructor(props: userInterface) {
    super(props);

    this.state = {
      userId: 0,
      prolificId: "",
      progress: 0
    }
  }

  async componentDidMount() {
    let userInfo = await register();
    this.setState({
      userId: userInfo.userId,
      prolificId: userInfo.prolificId,
      progress: userInfo.progress
    })
  }
  

  render() {
    return (
      <div className="App">
        <Sidebar points={210} total={15} current={12} />
        <Imagegrid />

      </div>
    );
  }
}

export default App;
