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
            <div className="textbubble flexcol">
                <div
                    className="bubblecontent"
                    style={{ marginBottom: "10px" }}>
                    <p>Listen to the following <b>6 numbers</b> by clicking on the play button below:</p>
                </div>
                <Audioplayer sound="CalibrationV2.mp3" />
                <div
                    className="bubblecontent"
                    style={{ marginBottom: "10px" }}>
                    <p style={{textAlign:"center"}}>
                        Set your device volume, so you can comfortably and clearly hear all 6 numbers. 
                        <br />
                        The first number should not be too loud and the last number should still be hearable.
                    </p>
                </div>
                Please enter the numbers here:
                <input 
                    type="number" 
                    value={calibrationNumber} 
                onChange={e => setCalibrationNumber(e.target.value)}
                />
                <p style={{ color: "darkred", fontWeight:"bold"}}>{badInput}</p>
            </div>

            

            <button
                className="btn"
                onClick={(event) => { click() }}
            ><p className="btnlabel">START STUDY</p></button>
        </div>
    )
}

export default SoundCalibration;