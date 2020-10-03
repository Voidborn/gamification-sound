import React from 'react'

function Progressbar(props:{ total: number, current: number }) {
    
    let progress = 100 * props.current / props.total;
    return (
        <div className="progress">
            <div className="progress-text">
                <p>Image {props.current} of {props.total}</p> 
            </div>
            <div className="progress-bar">
                <div className="progress-done"
                    style={{ width: `${progress}%` }}>
                    <p style={{color:"#FFC107", margin:"0px"}}>.</p>
                </div>
            </div>
        </div>
    )



}


export default Progressbar