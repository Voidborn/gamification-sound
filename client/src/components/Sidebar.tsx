import React from 'react';

import Pointbubble from './Pointbubble'


import Progressbar from './Progressbar'

function Sidebar(props: { points: number, total: number, current: number} )
{
    return (
        <div className="sidebar">
            <Progressbar total={props.total} current={props.current}/>
            <Pointbubble points={props.points}/>
            <div className="history">
                <h3 className="history-element">History</h3>
                <p className="history-element">Entry</p>
                <p className="history-element">Entry</p>
                <p className="history-element">Entry</p>
                <p className="history-element">Entry</p>
                <p className="history-element">Entry</p>
                <p className="history-element">Entry</p>
            </div>
        </div>
    )
}

export default Sidebar;