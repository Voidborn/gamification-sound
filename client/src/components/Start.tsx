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
            <div>
                <p>If you come from Prolific, please put your Prolific ID here:</p>
            </div>
            <div>
                <input value={prolificId} onChange={e=> setProlificId(e.target.value)} />
            </div>
            <div>
                <p></p>
            </div>
            <div className="grid-col">
                <button 
                    className="btn" 
                    onClick={
                        (event) => { registerUser() }
                    }>
                        <p className="btnlabel">START STUDY</p>
                </button>
            </div>
        </div>
    )
}

export default Start