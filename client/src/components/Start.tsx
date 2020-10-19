import React, {useState} from 'react'
import { register, fetchUserInfo } from '../api'
import { UserInfo } from '../interfaces/interfaces';

interface IProps {
   updateParentState(arg0: UserInfo):void
}

interface IState {
    prolificId: string,
}

const Start = (props: IProps) => {
    const [prolificId, setProlificId] = useState("");

    const registerUser = async () => {
        let token = (prolificId === "") ? await register() : await register(prolificId);
        if (token) {
            let user = await fetchUserInfo();
            props.updateParentState(user);
        }
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