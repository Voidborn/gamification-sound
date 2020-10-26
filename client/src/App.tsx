import React, {useState} from 'react';
import './App.css';

import Start from './components/Start'
import Imagerating from './components/Imagerating'
import Questionnaire from './components/Questionnaire'
import SoundCalibration from './components/SoundCalibration'

import demographics from './questionnairesJSON/demographics'
import music from './questionnairesJSON/music'
import imi from './questionnairesJSON/imi'

import { Response, UserInfo } from './interfaces/interfaces';
import { fetchUserInfo, submitResponse, fetchAudiofile } from './api';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [audiofile, setAudiofile] = useState("");

  const startStudy = async () => {
    let user = await fetchUserInfo();
    setProgress(user.studyProgress);
    setAudiofile(await fetchAudiofile());
  }

  const submitData = async (questionId: string, answer: string) =>{
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

    // pulls new User Info after trying to submit data,
    // to check whether the study has progressed
    let newUserInfo = await fetchUserInfo();
    console.log(newUserInfo);
    if (newUserInfo.studyProgress !== progress) {
      setProgress(newUserInfo.studyProgress)
    }

    return submissionSuccess;
  }

  const generateContent=() => {
    switch (progress) {
      case 0:
        return <Start startStudy={startStudy}/>
      case 1:
        return <Questionnaire surveyJson={demographics} submitData={submitData} questionId="demographics"/>
      case 2:
        return <Questionnaire surveyJson={music} submitData={submitData} questionId="music"/>
      case 3:
        return (audiofile !== "") ? <SoundCalibration submitData={submitData} /> : <div>{submitData("calibration","nosound")}</div>
      case 4:
        return <Imagerating audiofile={audiofile} submitData={submitData} />
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
    </div>
  );
  
}

export default App;
