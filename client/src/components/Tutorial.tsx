import React, {useState} from 'react'
import tutorial1 from '../img/Tutorial01.gif';
import tutorial2 from '../img/Tutorial02.gif';

const Tutorial = (props: { submitData(arg0: string, arg1: any): void }) => {
    return (
        <div className="flexcol">
            <div className="flexrow">
            <div className="textbubble flexcol">
                <div className="bubblecontent" style={{marginBottom:"10px"}}>
                    <p style={{ textAlign: "center" }}>                         
                        In the following task, you will be required to <br/><b>select</b> image parts containing <b>traffic signs</b>:
                        <br />
                    </p>
                </div>
                <div style={{ boxShadow: "0px 0px 5px darkslateblue" }}>
                    <img src={tutorial1} width="250px" alt="tutorial 1"/>
                </div>
                <br/>
            </div>
            <div className="textbubble flexcol">
                <div className="bubblecontent" style={{marginBottom:"10px"}}>
                    <p style={{ textAlign: "center" }}>                         
                    Selecting correct tiles will reward you with points, <br/>but selecting wrong tiles will subtract points!
                        <br />
                    </p>
                </div>
                <div style={{ boxShadow: "0px 0px 5px darkslateblue" }}>
                    <img src={tutorial2} width="250px" alt="tutorial 2"/>
                </div>
                <br/>


                </div>
                </div>

            <div className="grid-col">
                <button 
                    className="btn" 
                    onClick={
                        (event) => {props.submitData("tutorial", "completed")}
                    }>
                    <p className="btnlabel">CONTINUE</p>
                </button>
            </div>
        </div>
    )
}

export default Tutorial;
