import React, {useState} from 'react';
import './App.css';


import { User } from './interfaces/userInterface';
import Start from './components/Start'
import Imagerating from './components/Imagerating'
import DemographicsQ from './components/DemographicsQ'

const App = () => {
  const [userId, setUserId] = useState(0);
  const [prolificId, setProlificId] = useState("");
  const [progress, setProgress] = useState(0);

  const updateState = (u: User) => {
    setUserId(u.userId);
    setProlificId(u.prolificId);
    setProgress(u.progress);
  }

  const submitData = () =>{
    //TODO: Placeholder to be replaced by server message
    setProgress(1+progress);
  }

  const generateContent=() => {
    switch (progress) {
      case 0:
        return <Start updateParentState={updateState}/>
      case 1:
        return <DemographicsQ submitData={submitData}/>
      case 2:
        return <Imagerating userId={userId}/>
    }
  }

  return (
    <div className="App">
      {generateContent()}
    </div>
  );
  
}

export default App;
