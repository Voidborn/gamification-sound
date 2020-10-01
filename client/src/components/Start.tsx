import React, {useState} from 'react'
import { setConstantValue } from 'typescript';

import { register } from '../api'

import { User } from '../interfaces/userInterface'
interface IProps {
   updateParentState(arg0:User):void
}

interface IState {
    prolificId: string,
}

const Start = (props: IProps) => {
    const [prolificId, setProlificId] = useState("");

    const registerUser = async () => {
        let userInfo = (prolificId === "") ? await register() : await register(prolificId);

        console.log(userInfo)
        props.updateParentState(userInfo);
      }

    return (
        <div>
            <div className="grid-row">
                <div>
                    <p>If you come from Prolific, please put your Prolific ID here:</p>
                    <input value={prolificId} onChange={e=> setProlificId(e.target.value)} />
                </div>
            </div>
            <p></p>
            <div className="grid-row">
                <div className="grid-col">
                    <button className="btn" onClick={(event) => { registerUser() }}><h1>START STUDY</h1></button>
                </div>
            </div>
        </div>

    )
    
}


export default Start