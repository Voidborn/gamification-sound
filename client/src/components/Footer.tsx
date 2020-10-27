import React from 'react';
import Progressbar from './Progressbar';

const Footer = (props: {total:number, current:number}) => {
    return (
        <div className="footer">
            <Progressbar total={props.total} current={props.current} />
            <h1 className="smalltext">Contact:</h1>
            <p className="smalltext">Maximilian Altmeyer - Stuhlsatzenhausweg 3, Saarland Informatics Campus D 3_2, 66123 Saarbrücken, Germany</p>
            <p className="smalltext">maximilian.altmeyer(at)dfki.de</p>
            <p></p>
        </div>
    )

}
export default Footer;