import React from 'react';
import Progressbar from './Progressbar';

const Footer = (props: { total: number, current: number, imageProgress: number[], imprint():void, dataProt():void  }) => {
    //<p className="smalltext">Maximilian Altmeyer - Stuhlsatzenhausweg 3, Saarland Informatics Campus D 3_2, 66123 Saarbrücken, Germany</p>
    //<p className="smalltext">maximilian.altmeyer(at)dfki.de</p>
    return (
        <div className="footer">
            <p className="progress-text">Step {props.current} of {props.total}</p> 
            <Progressbar total={props.total + props.imageProgress[1]} current={props.current + props.imageProgress[0]} />
            <div className="flexrow">
                <h1 className="smalltext clickable" onClick={() => props.imprint()}>Imprint</h1>
                <h1 style={{width:"20px"}}></h1>
                <h1 className="smalltext clickable" onClick={() => props.dataProt()}>Data protection</h1>
            </div>
        </div>
    )
}
export default Footer;