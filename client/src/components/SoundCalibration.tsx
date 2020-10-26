import React, { useState } from 'react';
import Audioplayer from './Audioplayer';


const SoundCalibration = (props: {submitData(arg0:string,arg1:any): void}) => {
    const [calibrationNumber, setCalibrationNumber] = useState("");
    const [badInput, setBadInput] = useState("");
    const click = () => {
        if (calibrationNumber === "516971") {
            props.submitData("calibration", calibrationNumber);
        } else {
            if (calibrationNumber === "") {
                setBadInput("You have not entered any number yet!")
            } else {
                setBadInput("You entered the wrong number! There are 6 digits in total!");
            }
        }
    }

    return (
        <div className="flexcol">
            <p>Listen to the following sound:</p>
            <Audioplayer sound = "CalibrationV2.mp3"/>
            <p>Set your device volume, so you can comfortably and clearly hear all 6 numbers.</p>
            <input 
                type="number" 
                value={calibrationNumber} 
                onChange={e => setCalibrationNumber(e.target.value)}
            />
            <p>{badInput}</p>
            <button
                className="btn"
                onClick={(event) => { click() }}
            ><p className="btnlabel">START STUDY</p></button>
        </div>
    )
}

export default SoundCalibration;