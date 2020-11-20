import React from 'react'

const PopoutScreen = (props:{toggle():void, title:string, text:JSX.Element, secondaryOnClick?():void, secondaryButtonText?:string}) => {
    return <div className="popoutScreen">
        <div className="flexcol">
            <div className="textbubble flexcol">
                <div className="bubblecontent">
                    <h2 style={{textAlign: "center"}}>{props.title}</h2>
                    {props.text}
                </div>
            </div>
            <div className="grid-col">
                <div className="grid-row">
                    {props.secondaryOnClick ?
                        <button
                            className="btn"
                            onClick={(event) => {
                                if (props.secondaryOnClick) {
                                props.secondaryOnClick()
                                }
                            }}>
                            <p className="btnlabel">{props.secondaryButtonText}</p>
                        </button>
                        : null
                    }
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
    </div>
}

export default PopoutScreen