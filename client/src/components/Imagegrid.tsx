import React, {useEffect, useState} from 'react';

import { fetchNextImage, getImageUrl} from '../api';
import { Image } from '../interfaces/interfaces'


interface IProps{
    addPoints(arg0: number): void,
    submitData(arg0: string, arg1: any): void,
    
}

const Imagegrid = (props: IProps) => {
    // TODO: initial server request
    const [imageName, setImageName] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [marked, setMarked] = useState([false,false,false,false,false,false,false,false,false,false,false,false])
    const [imageLoaded, setImageLoaded] = useState(false);

    //kind of a ComponentDidMount function to load initial image
    useEffect(() => {
        if (!imageLoaded) {
            getNextImage();
            setImageLoaded(true);
        }
    },[imageLoaded])

    const getNextImage = async () => {
        let newImage: Image = await fetchNextImage();
        setImageName(newImage.name);
        setImagePath(getImageUrl(newImage.name));
        setPoints(newImage.points);
        setMarked([false,false,false,false,false,false,false,false,false,false,false,false]);
    }


    const confirmImage = async () => {
        let pointSum = 0;
        points.forEach((p, index) => {
            if (marked[index]) {
                pointSum += p;
            }
        })


        let answer = JSON.stringify({
            pointSum: pointSum,
            points: points,
            marked: marked
        })

        await props.submitData(imageName, answer);

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
            {imageName}
        </div>
    )
    
}

export default Imagegrid