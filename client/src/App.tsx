import React, {useState} from 'react';
import './App.css';

import Start from './components/Start'
import Tutorial from './components/Tutorial'
import Imagerating from './components/Imagerating'
import Questionnaire from './components/Questionnaire'
import SoundCalibration from './components/SoundCalibration'
import Footer from './components/Footer'
import Endcard from './components/Endcard'
import PopoutScreen from './components/PopoutScreen'

import DataProtectionText from './components/DataProtectionText';
import ImprintText from './components/ImprintText';

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
  const [loading, setLoading] = useState(true);

  const [imprintOpen, setImprint] = useState(false);
  const [dataProtectionOpen, setDataProtection] = useState(false);

  const startStudy = async () => {
    let user = await fetchUserInfo();
    setProgress(user.studyProgress);
    setAudiofile(await fetchAudiofile());
    setImageProgress([user.currentImage, user.totalImages]);
    setLoading(false);
  }

  const toggleImprint = () => {
    if (imprintOpen) {
      setImprint(false);
    }
    else {
      setImprint(true);
      setDataProtection(false);
    }
  }

  const toggleDataprotection = () => {
    if (dataProtectionOpen) {
      setDataProtection(false);
    }
    else {
      setDataProtection(true);
      setImprint(false);
    }
  }

  const submitData = async (questionId: string, answer: string) => {
    setLoading(true);
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
    setLoading(false);
    return submissionSuccess;
  }

  const generateContent = () => {
    switch (progress) {
      case 0:
        return <Start startStudy={startStudy}/>
      case 1:
        return <Questionnaire surveyJson={demographics} submitData={submitData} questionId="demographics"/>
      case 2:
        return <Questionnaire surveyJson={music} submitData={submitData} questionId="music"/>
      case 3:
        if (!loading) {
          if (audiofile !== "") {
            return <SoundCalibration submitData={submitData} />
          } else {
            submitData("calibration", "nosound");
            console.log("no sound!");
            return <div></div>
          }
        }
        break;
      case 4:
        return <Tutorial submitData={submitData}/>
      case 5:
        return <Imagerating audiofile={audiofile} submitData={submitData}/>
      case 6: 
        return <Questionnaire surveyJson={sam} submitData={submitData} questionId="sam" />
      case 7:
        return <Questionnaire surveyJson={imi} submitData={submitData} questionId="imi" />
      case 8:
        return <Questionnaire surveyJson={pei} submitData={submitData} questionId="pei" />
      case 9:
        return <Endcard />

    }
  }

  return (
    <div className="App">
      {dataProtectionOpen ?
        <PopoutScreen
          toggle={toggleDataprotection}
          title={"Data Protection"}
          text={<DataProtectionText />}
      /> : null}
      {imprintOpen ?
        <PopoutScreen
          toggle={toggleImprint}
          title={"Imprint"}
          text={<ImprintText />}
        /> : null}
      {generateContent()}
      <Footer
        total={8}
        current={progress}
        imageProgress={imageProgress}
        imprint={toggleImprint}
        dataProt={toggleDataprotection}
      />
    </div>
  );
  
}

export default App;
