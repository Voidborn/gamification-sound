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
    const [imageName, setImageName] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [marked, setMarked] = useState([false,false,false,false,false,false,false,false,false,false,false,false])
    const [imageLoaded, setImageLoaded] = useState(false);
    
    //animation class variables:
    const [numberAnim, setNumberAnim] = useState("");
    const [cellAnim, setCellAnim] = useState("");

    //kind of a ComponentDidMount function to load initial image
    useEffect(() => {
        if (!imageLoaded) {
            getNextImage();
            setImageLoaded(true);
        }
    },[imageLoaded])


    const startAnimations= () => {
        setNumberAnim("cellNumAnim");
        setCellAnim("cellAnim");
    }

    const endAnimations = () => {
        setNumberAnim("");
        setCellAnim("");
    }

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

        pointSum = Math.max(pointSum, 0);

        let answer = {
            pointSum: pointSum,
            points: points,
            marked: marked
        }


        if (props.audiofile !== "" && pointSum !== 0) {
            playSound();
        }

        props.addPoints(pointSum);
        startAnimations();


        setTimeout(() => {

            getNextImage();
            endAnimations();
        },2000)
        await props.submitData(imageName, answer);
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

    /** <div className="image-container">
        <div>
            <img className="traffic-image" src={imagePath} alt="trafficsign"/>
        </div>
        <div className="overlay image-overlay">
            

        </div>     
    </div>  */
    return (
        <div className="image-rating flexcol">
            <div className="textbubble flexcol">
                <div className="bubblecontent" style={{marginBottom:"10px"}}>
                    <p style={{textAlign:"center"}}>
                        Please select all squares which contain <b>traffic signs</b> or <b>parts of traffic signs</b>.
                        <br />
                        <i>Do not select traffic lights or other types of signs!</i>
                    </p>
                </div>
            </div>

            <div className="image-container">
                <div className="image-overlay">
                    <div className="grid-row">
                        {points.map((i, index) =>
                            <div
                                key={index}
                                className="cell"
                                onClick={(event) => markImage(index)}
                            >
                                <p
                                    className={`pointCell ${marked[index] ? numberAnim : ""}`}
                                    style={(i<0)?{color:"darkred"}:{color:"darkslateblue"}}>{i}</p>
                                <img
                                    className={`cell ${marked[index]?"":cellAnim}`}
                                    src={marked[index] ? "img/selected-cell.svg" : "img/unselected-cell.svg"}
                                    alt="grid cell"
                                />
                            </div>    
                            )}
                    </div>
                </div>
                <img
                    id="traffic-image"
                    className="traffic-image"
                    src={imagePath}
                    alt="trafficsign" />

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