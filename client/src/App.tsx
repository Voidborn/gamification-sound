import React, {useState} from 'react';
import './App.css';

import { User } from './interfaces/userInterface';
import Start from './components/Start'
import Imagerating from './components/Imagerating'
import Questionnaire from './components/Questionnaire'

import demographics from './questionnairesJSON/demographics'
import music from './questionnairesJSON/music'

const App = () => {
  const [userId, setUserId] = useState(0);
  const [prolificId, setProlificId] = useState("");
  const [progress, setProgress] = useState(0);

  const updateState = (u: User) => {
    setUserId(u.userId);
    setProlificId(u.prolificId);
    setProgress(u.progress);
  }

  const submitData = (data:any) =>{
    //TODO: Placeholder to be replaced by server message

    setProgress(1+progress);
  }

  const generateContent=() => {
    switch (progress) {
      case 0:
        return <Start updateParentState={updateState}/>
      case 1:
        return <Questionnaire surveyJson={demographics} submitData={submitData}/>
      case 2:
        return <Questionnaire surveyJson={music} submitData={submitData}/>
      case 3:
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
