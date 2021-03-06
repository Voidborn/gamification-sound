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

    const [buttonClickable, setClickable] = useState(true);

    const [error, setError] = useState(false);
    
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
        setClickable(false);
        let markedCount = 0;
        let pointSum = 0;
        points.forEach((p, index) => {
            if (marked[index]) {
                pointSum += p;
                markedCount++;
            }
        })

        if (markedCount === 0) {
            setError(true);
            setClickable(true);
            return;
        }

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

        setTimeout(async () => {
            await props.submitData(imageName, answer);
            await getNextImage();
            endAnimations();
            setClickable(true);
        },1800)
    }

    const markImage = (index: number): void => {
        if (!buttonClickable) return;
        let newMarked = marked.slice();
        
        newMarked[index] = !newMarked[index];
        setError(false);
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
        <div className="image-rating flexcol">
            <div className="textbubble flexcol">
                <div className="bubblecontent" style={{marginBottom:"10px"}}>
                    <p style={{textAlign:"center"}}>
                        Please mark all squares which contain <b>traffic signs</b> or <b>parts of traffic signs</b>.
                        <br />
                        <i>Do not mark traffic lights or other types of signs!</i>
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
                                    style={(i<0)?{color:"darkred"}:{color:"darkslateblue"}}>{(i>=0)?"+"+i:i}</p>
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
            <div>
                <button
                    className="btn" onClick={(event) => { if (buttonClickable) { confirmImage() } }}>
                    <p className="btnlabel">NEXT IMAGE</p>
                    {error?<b style={{color:"darkred", fontSize:"x-large"}}>Select at least one cell!</b>: null}
                </button>
            </div>

        </div>
    )
    
}

export default Imagegrid