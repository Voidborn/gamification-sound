import React from 'react';

import Pointbubble from './Pointbubble'

interface IProps {
    points: number,
    pointHistory: number[]
}

function Sidebar(props: IProps)
{
    return (
        <div className="sidebar">
            <Pointbubble points={props.points}/>
            <div className="history">
                <h3 className="history-element">History</h3>
                {(props.pointHistory.slice().reverse()).map((e, index) => 
                    (index < 15) ?
                        <p className="history-element" key={index}><b>{e}</b><b>Points</b></p>
                        :
                        null
                )}

            </div>
        </div>
    )
}

export default Sidebar;