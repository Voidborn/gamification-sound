import React, {useState} from 'react'

import Sidebar from './Sidebar';
import Imagegrid from './Imagegrid';

interface IProps{
    submitData(arg0:string,arg1:any): void,
}

const Imagerating = (props: IProps) => {
    const [points, setPoints] = useState(0);
    const [pointHistory, setHistory] = useState<number[]>([]);
    
    return (
        <div>
            <Sidebar points={points} total={100} current={50} pointHistory={pointHistory}/>
            <Imagegrid
                addPoints={(p: number) => {
                    setPoints(points + p);
                    let newHistory = pointHistory.slice();
                    newHistory.push(p);
                    setHistory(newHistory);
                }}
                submitData={props.submitData}
                />
        </div>
    )
}


export default Imagerating