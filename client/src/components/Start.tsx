import React from 'react'

import { register } from '../api'

import { User } from '../interfaces/userInterface'
interface IProps {
   updateParentState(arg0:User):void
}

interface IState {
    prolificId: string,
}

class Start extends React.Component<IProps,IState> {

    async registerUser() {
        let userInfo = await register();
        console.log(userInfo)
        this.props.updateParentState(userInfo);
      }

    render() {
        return (
            <div className="grid-row">
                <div className="grid-col">
                    <button className="btn" onClick={(event) => { this.registerUser() }}><h1>START STUDY</h1></button>
                </div>
            </div>
        )
    }
}


export default Start