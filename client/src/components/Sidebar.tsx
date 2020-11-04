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
                <h2 className="history-element">Point History</h2>
                {(props.pointHistory.slice().reverse()).map((e, index) => 
                    (index < 10) ?
                        <p className="history-element" style={{opacity:(10-index)/10}}key={index}>{"+" + e + " Points"}</p>
                        :
                        null
                )}

            </div>
        </div>
    )
}

export default Sidebar;