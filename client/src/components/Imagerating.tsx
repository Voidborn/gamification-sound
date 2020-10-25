import React, {useEffect, useState} from 'react'

import Sidebar from './Sidebar';
import Imagegrid from './Imagegrid';

import { getPointsCookie,setPointsCookie } from '../cookieManager';

interface IProps{
    audiofile: string,
    submitData(arg0:string,arg1:any): void,
}

const Imagerating = (props: IProps) => {
    const [points, setPoints] = useState<number>(0);
    const [pointHistory, setHistory] = useState<number[]>([]);
    
    useEffect(
        () =>{
            if (points === 0) {
                let cookiepoints = parseInt(getPointsCookie());
                if (cookiepoints) {
                    setPoints(cookiepoints)
                }
            }
        },[points]
    )

    const addPoints = (p: number) => {
        const sum: number = points + p;
        console.log(sum);
        setPointsCookie(sum);
        setPoints(sum);
        let newHistory = pointHistory.slice();
        newHistory.push(p);
        setHistory(newHistory);
    }

    return (
        <div>
            <Sidebar points={points} total={100} current={50} pointHistory={pointHistory}/>
            <Imagegrid
                audiofile={props.audiofile}
                addPoints={addPoints}
                submitData={props.submitData}
                />
        </div>
    )
}


export default Imagerating