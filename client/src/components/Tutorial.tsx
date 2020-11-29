import React from 'react'
import tutorial1 from '../img/Tutorial01.gif';
import tutorial2 from '../img/Tutorial02.gif';

const Tutorial = (props: { submitData(arg0: string, arg1: any): void }) => {
    return (
        <div className="flexcol">
            <div className="flexrow">
                <div className="textbubble flexcol">
                    <div className="bubblecontent" style={{marginBottom:"10px"}}>
                        <p style={{ textAlign: "center" }}>                         
                            In the following task, you will be required to <br/><b>mark</b> image parts containing <b>traffic signs</b>:
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
                            Marking correct tiles will <b style={{color:"darkslateblue"}}>reward you with points</b>,
                            <br/>
                            but marking wrong tiles will <b style={{color:"darkred"}}>subtract points</b>!            
                        </p>
                    </div>
                    <div style={{ boxShadow: "0px 0px 5px darkslateblue" }}>
                        <img src={tutorial2} width="250px" alt="tutorial 2"/>
                    </div>
                    <div className="bubblecontent" style={{marginBottom:"10px"}}>
                        <p style={{ textAlign: "center" }}>                         
                        <b style={{color:"darkred"}}>Empty cells, traffic lights</b> or <b style={{color:"darkred"}}>sign posts</b> count negative!             
                        </p>
                    </div>

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
