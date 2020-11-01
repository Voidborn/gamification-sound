import React, {useEffect, useState} from 'react'

import Sidebar from './Sidebar';
import Imagegrid from './Imagegrid';

import { fetchHistory } from '../api';

interface IProps{
    audiofile: string,
    submitData(arg0:string,arg1:any): void,
}

const Imagerating = (props: IProps) => {
    const [points, setPoints] = useState<number>(0);
    const [pointHistory, setPointHistory] = useState<number[]>([]);
    const [dataChecked, setDataChecked] = useState(false);
    
    const refreshDataFromServer = async () => {
        let h = await(fetchHistory());
        setPointHistory(h);

        let sum = pointHistory.reduce(function (a, b) { return a + b; }, 0);

        setPoints(sum)

        setDataChecked(true);
    }

    useEffect(
        () => {
            if (dataChecked === false) {
                refreshDataFromServer();
            }
        },[refreshDataFromServer,dataChecked]
    )

    const addPoints = (p: number) => {
        const sum: number = points + p;
        setPoints(sum);
        let newHistory = pointHistory.slice();
        newHistory.push(p);
        setPointHistory(newHistory);
    }

    return (
        <div>
            <Sidebar points={points} pointHistory={pointHistory}/>
            <Imagegrid
                audiofile={props.audiofile}
                addPoints={addPoints}
                submitData={props.submitData}
                />
        </div>
    )
}


export default Imagerating