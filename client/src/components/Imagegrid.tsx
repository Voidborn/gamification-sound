import React, {useState} from 'react';

import { fetchNextImage } from '../api';
import { Image } from '../interfaces/imageInterface'


interface IProps{
    userId: number,
    addPoints(arg0:number):void
}

const Imagegrid = (props: IProps) => {

    // TODO: initial server request
    const [imagePath, setImagePath] = useState("img/traffic-signs/road536.png");
    const [points, setPoints] = useState([0, 5, 10, 0, 5, 10, 0, 5, 10, 0, 0, 0]);
    const [marked, setMarked] = useState([false,false,false,false,false,false,false,false,false,false,false,false])

    const getNextImage = async () => {
        let newImage: Image = await fetchNextImage();
        setImagePath(newImage.path);
        setPoints(newImage.points);
        setMarked(newImage.marked);
    }

    const confirmImage = () => {
        let pointSum = 0;
        points.forEach((p, index) => {
            if (marked[index]) {
                pointSum += p;
            }
        })
        props.addPoints(pointSum);

        getNextImage();
    }

    const markImage = (index: number): void => {
        let newMarked = marked.slice();
        
        newMarked[index] = !newMarked[index];
        
        setMarked(newMarked);
    }

    return (
        <div className="image-rating">
            <div className="image-container">
                <div>
                    <img className="traffic-image" src={imagePath} alt="trafficsign" width="300" height="400" />
                </div>
                <div className="overlay image-overlay">
                    <div className="grid-row">
                        {points.map((i, index) =>
                            <img
                                className="cell"
                                key={index}
                                src={marked[index] ? "img/selected-cell.svg" : "img/unselected-cell.svg"}
                                alt="grid cell"
                                onClick={(event) => markImage(index)}
                            />
                        )}
                    </div>
                </div>     
            </div> 
            <div className="image-container">
                <button
                    className="btn" onClick={(event) => {confirmImage()}}>
                    <h1>NEXT IMAGE</h1>
                </button>
            </div>
        </div>
    )
    
}

export default Imagegrid