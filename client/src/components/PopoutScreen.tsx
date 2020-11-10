import React from 'react'

const PopoutScreen = (props:{toggle():void, title:string, text:JSX.Element}) => {
    return <div className="popoutScreen">
        <div className="flexcol">
            <div className="textbubble flexcol">
                <div className="bubblecontent">
                    <h2 style={{textAlign: "center"}}>{props.title}</h2>
                    {props.text}
                </div>
            </div>
            <div className="grid-col">
                <button 
                    className="btn" 
                    onClick={
                        (event) => {props.toggle() }
                    }>
                        <p className="btnlabel">CLOSE</p>
                </button>
            </div>
        </div>
    </div>
}

export default PopoutScreen