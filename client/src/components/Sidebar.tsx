import React from 'react';

import Pointbubble from './Pointbubble'


import Progressbar from './Progressbar'

interface IProps {
    points: number,
    total: number,
    current: number,
    pointHistory: number[]
}

function Sidebar(props: IProps)
{
    return (
        <div className="sidebar">
            <Progressbar total={props.total} current={props.current}/>
            <Pointbubble points={props.points}/>
            <div className="history">
                <h3 className="history-element">History</h3>
                {(props.pointHistory.slice().reverse()).map((e, index) => 
                    (index < 15) ?
                        <p className="history-element">{e} Points</p>
                        :
                        null
                )}

            </div>
        </div>
    )
}

export default Sidebar;