import React, {useState} from 'react';
import './App.css';

import Start from './components/Start'
import Imagerating from './components/Imagerating'
import Questionnaire from './components/Questionnaire'
import SoundCalibration from './components/SoundCalibration'
import Footer from './components/Footer'
import Endcard from './components/Endcard'

import demographics from './questionnairesJSON/demographics'
import music from './questionnairesJSON/music'
import imi from './questionnairesJSON/imi'
import pei from './questionnairesJSON/pei'
import sam from './questionnairesJSON/sam'

import { Response } from './interfaces/interfaces';
import { fetchUserInfo, submitResponse, fetchAudiofile } from './api';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [audiofile, setAudiofile] = useState("");
  const [imageProgress, setImageProgress] = useState([0, 0]); // [0]: current , [1]: total

  const startStudy = async () => {
    let user = await fetchUserInfo();
    setProgress(user.studyProgress);
    setAudiofile(await fetchAudiofile());
    setImageProgress([user.currentImage, user.totalImages]);
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
    if (newUserInfo.currentImage !== imageProgress[0]) {
      setImageProgress([newUserInfo.currentImage, newUserInfo.totalImages]);
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
        if (audiofile !== "") {
          return <SoundCalibration submitData={submitData}/>
        } else {
          submitData("calibration", "nosound");
          return <div></div>
        }
      case 4:
        return <Imagerating audiofile={audiofile} submitData={submitData} />
      case 5: 
        return <Questionnaire surveyJson={sam} submitData={submitData} questionId="sam" />
      case 6:
        return <Questionnaire surveyJson={imi} submitData={submitData} questionId="imi" />
      case 7:
        return <Questionnaire surveyJson={pei} submitData={submitData} questionId="pei" />
      case 8:
        return <Endcard />

    }
  }

  return (
    <div className="App">
      {generateContent()}
      {<Footer total={8} current={progress} imageProgress={imageProgress}/>}
    </div>
  );
  
}

export default App;
