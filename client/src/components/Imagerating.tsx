import React, {useState} from 'react'

import Sidebar from './Sidebar';
import Imagegrid from './Imagegrid';

interface IProps{
    userId: number
}

const Imagerating = (props: IProps) => {
    const [points, setPoints] = useState(0);
    const [userId] = useState(props.userId);
    
    return (
        <div>
            <Sidebar points={points} total={15} current={12} />
            <Imagegrid
                addPoints={(p: number) => {
                    setPoints(points + p);
                }}
                userId={userId} />
        </div>
    )
}


export default Imagerating