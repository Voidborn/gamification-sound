import React, {useEffect, useState} from 'react'
import { register} from '../api'
import { getToken } from '../cookieManager';

interface IProps {
   startStudy():void
}

interface IState {
    prolificId: string,
}

const Start = (props: IProps) => {
    const [prolificId, setProlificId] = useState("");
    const [checked, setChecked] = useState(false); 
    const [error, setError] = useState(false);

    useEffect(() => {
        let token = getToken();
        if (token && token !== "") {
            console.log("use Effect in Start does stuff");
            props.startStudy();
        }
    })


    const registerUser = async () => {
        let token = (prolificId === "") ? await register() : await register(prolificId);
        if (token) {
            props.startStudy();
        }
      }
    
    return (
        <div className="flexcol">
            <div className="textbubble flexcol">
                <h2>Participant Information:</h2>
                <p>
                    This survey is part of ongoing research on sound effects in gamified applications. 
                    You will be asked to complete several tasks and fill out questionnaires. 
                    Filling out this survey will take about 10 minutes. <br/>
                    Your data will be stored and processed anonymously. 
                    The survey is carried out by Vladislav Hnatovskiy as part of a Master thesis at DFKI (German Research Center for Artificial Intelligence). 
                    The thesis is advised by Maximilian Altmeyer. 
                    If you have any questions or remarks, contact us at maximilian.altmeyer(at)dfki.de. 
                    We thank you for your time and participation.
                </p>

                <label style={error?{fontWeight: "bold", color:"red" }:{}}>
                    <input style={{ marginRight: "10px"}} type="checkbox" defaultChecked={checked} onChange={(e) => setChecked(!checked)} />
                    I have read and understood the information on data prodection and the participation information and agree that my data may be used anonymously for scientific research purposes.
                </label>

                

               <p></p>
                <p>If you come from Prolific, please enter your Prolific ID here:</p>
                <input value={prolificId} onChange={e => setProlificId(e.target.value)} />
            </div>
            <div>
                
            </div>
            <div>
                <p></p>
            </div>
            <div className="grid-col">
                <button 
                    className="btn" 
                    onClick={
                        (event) => { checked ? registerUser() : setError(true) }
                    }>
                        <p className="btnlabel">START STUDY</p>
                </button>
            </div>
        </div>
    )
}

export default Start