import React from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import Imagegrid from './components/Imagegrid';



function App() {
  return (
    <div className="App">
      <Sidebar points={210} total={15} current={12} />
      <Imagegrid />

    </div>
  );
}

export default App;
