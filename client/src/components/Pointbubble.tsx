import React from 'react'

import pointlogo from '../img/point-bubble.svg';


function Pointbubble(props: { points: number }) {
    return (
        <div className="pointbubble">
            <img src={pointlogo} width="100%" alt="upsi"/>
            <div className="overlay points">
                <h1 className="point-number">{props.points}</h1>
                <h2 className="point-text">{props.points === 1 ? "POINT" : "POINTS"}</h2>
            </div>
        </div>
    )

}

export default Pointbubble