import React, {useEffect, useState} from 'react'
import { register} from '../api'
import { getToken } from '../cookieManager';

interface IProps {
    startStudy(): void,
    toggleDataprot(): void
}

interface IState {
    prolificId: string,
}

const Start = (props: IProps) => {
    const [prolificId, setProlificId] = useState("");
    const [dataProtection, setDataProtection] = useState(false); 
    const [audioCheck, setAudioCheck] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        let token = getToken();
        if (token && token !== "" && token !== undefined) {
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
        <div className="flexcol" style={{marginBottom: "150px"}}>
            <div className="textbubble flexcol">
                <div className="bubblecontent">
                    <h2>Participant Information:</h2>
                    <p style={{textAlign:"justify"}}>
                        This survey is part of ongoing research on sound effects in gamified applications. 
                        You will be asked to complete several tasks and fill out questionnaires. 
                        Filling out this survey will take about 10 minutes. <br/>
                        Your data will be stored and processed anonymously. 
                        The survey is carried out by Vladislav Hnatovskiy as part of a Master thesis at DFKI (German Research Center for Artificial Intelligence). 
                        The thesis is advised by Maximilian Altmeyer. 
                        If you have any questions or remarks, contact us at <a href="mailto:s9vlhnat@stud.uni-saarland.de">s9vlhnat@stud.uni-saarland.de</a> or <a href="mailto:maximilian.altmeyer@dfki.de">maximilian.altmeyer@dfki.de</a>. 
                        We thank you for your time and participation.
                    </p>

                    <label style={(!dataProtection&&error)?{fontWeight: "bold", color:"red" }:{}}>
                        <input style={{ marginRight: "10px"}} type="checkbox" defaultChecked={dataProtection} onChange={(e) => setDataProtection(!dataProtection)} />
                        I have read and understood the information on <b style={{color:"blue",cursor:"pointer"}}onClick={()=>props.toggleDataprot()}>data prodection</b> and the participant information and agree that my data may be used anonymously for scientific research purposes.
                    </label>
                    <br />
                    <br/>
                    <p style={{textAlign:"justify"}}>
                        To complete this study you require a working audio output, such as headphones or speakers.
                        <br />
                        Please make sure to <b>turn off any other audio sources</b> (such as music, podcasts or videos) while completing the survey.
                    </p>

                    <label style={(!audioCheck && error)?{fontWeight: "bold", color:"red" }:{}}>
                        <input style={{ marginRight: "10px"}} type="checkbox" defaultChecked={audioCheck} onChange={(e) => setAudioCheck(!audioCheck)} />
                        I confirm that I have a working audio output and have turned off all other audio sources.
                    </label>
                    <br />
                    <br />
                    <br />
                    {/*
                    <p style={{ textAlign: "center" }}>
                        Please enter your Prolific ID here:
                        <input
                            value={prolificId}
                            style={{marginLeft:"10px"}}
                            onChange={e => setProlificId(e.target.value)} />
                        </p>
                    */}
                </div>
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
                        (event) => { (dataProtection && audioCheck) ? registerUser() : setError(true) }
                    }>
                        <p className="btnlabel">START STUDY</p>
                </button>
            </div>
        </div>
    )
}

export default Start