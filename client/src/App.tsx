import React, {useEffect, useState} from 'react';
import './App.css';

import Start from './components/Start'
import Imagerating from './components/Imagerating'
import Questionnaire from './components/Questionnaire'

import demographics from './questionnairesJSON/demographics'
import music from './questionnairesJSON/music'
import { Response, UserInfo } from './interfaces/interfaces';
import { fetchUserInfo, submitResponse } from './api';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [testgroup, setTestgroup] = useState(0);

  const updateState = (user: UserInfo) => {
    setProgress(user.studyProgress);
    setTestgroup(user.testgroup);
  }

  const submitData = async (questionId: string, answer: string) =>{
    //TODO: Placeholder to be replaced by server message
    let response: Response = {
      studyProgress: progress,
      questionId: questionId,
      answer: answer
    }
    let submissionSuccess = await submitResponse(response);
    console.log(submissionSuccess);
    if (!submissionSuccess) {
      console.error("Answer submission failed!");
    }

    let newUserInfo = await fetchUserInfo();
    console.log(newUserInfo);
    if (newUserInfo.studyProgress !== progress) {
      setProgress(newUserInfo.studyProgress)
    }
  }

  const generateContent=() => {
    switch (progress) {
      case 0:
        return <Start updateParentState={updateState}/>
      case 1:
        return <Questionnaire surveyJson={demographics} submitData={submitData} questionId="demographics"/>
      case 2:
        return <Questionnaire surveyJson={music} submitData={submitData} questionId="music"/>
      case 3:
        return <Questionnaire surveyJson={demographics} submitData={submitData} questionId="soundCalibration"/>
      case 4:
        return <Imagerating submitData={submitData} />
    }
  }

  return (
    <div className="App">
      {generateContent()}
    </div>
  );
  
}

export default App;
