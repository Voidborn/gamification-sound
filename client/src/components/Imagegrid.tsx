import { Howl } from 'howler';
import React, {useEffect, useState} from 'react';

import { fetchNextImage, getImageUrl, getSoundUrl} from '../api';
import { Image } from '../interfaces/interfaces';

interface IProps{
    audiofile: string,
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
        playSound();
        props.addPoints(pointSum);
        getNextImage();
    }

    const markImage = (index: number): void => {
        let newMarked = marked.slice();
        
        newMarked[index] = !newMarked[index];
        
        setMarked(newMarked);
    }

    const playSound = async () => {
        let src:string = await getSoundUrl(props.audiofile)
        const sound = new Howl({
            src,
            html5: true
        })
        sound.play();
    }

    return (
        <div className="image-rating">
            <div className="image-container">
                <div>
                    <img className="traffic-image" src={imagePath} alt="trafficsign"/>
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
            <p className="smalltext" style={{textAlign:"center", color:"white"}}>{imageName}</p>
            <div className="image-container">
                <button
                    className="btn" onClick={(event) => {confirmImage()}}>
                    <p className="btnlabel">NEXT IMAGE</p>
                </button>
            </div>

        </div>
    )
    
}

export default Imagegrid