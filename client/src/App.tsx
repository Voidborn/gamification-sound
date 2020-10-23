import React, {useState} from 'react';
import './App.css';

import Start from './components/Start'
import Imagerating from './components/Imagerating'
import Questionnaire from './components/Questionnaire'
import Audioplayer from './components/Audioplayer'

import demographics from './questionnairesJSON/demographics'
import music from './questionnairesJSON/music'
import imi from './questionnairesJSON/imi'

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

    return true;
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
        submitData("3", "no calibration done yet"); //TODO: sound calibration
        return <div></div>
      case 4:
        return <Imagerating submitData={submitData} />
      case 5:
        return <Questionnaire surveyJson={imi} submitData={submitData} questionId="imi" />
      case 6:
        return <div>
          <p>THANK YOU FOR PARTICIPATING!</p>
        </div>
    }
  }

  return (
    <div className="App">
      {generateContent()}
      <Audioplayer/>
    </div>
  );
  
}

export default App;
