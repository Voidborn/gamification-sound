import React, { useEffect, useState } from 'react';

import NumberEasing from 'react-number-easing';

import pointlogo from '../img/point-bubble.svg';



const Pointbubble = (props: { points: number }) => {
    const [currentPoints, setCurrentPoints] = useState(0);
    const [bubbleImgAnim, setBubbleImgAnim] = useState("");
    const [pointsAnim, setPointsAnim] = useState("");
    const [subtitleAnim, setSubtitleAnim] = useState("");

    useEffect(() => {
        if (props.points !== currentPoints) {
            setCurrentPoints(props.points);
            animationsStart();
        }
    },[props.points,currentPoints])

    const animationsStart = () => {
        setBubbleImgAnim("bubbleanimation");
        setPointsAnim("pointanimation");
        setSubtitleAnim("pointtextanimation");
    }

    const animationsEnd = () => {
        setBubbleImgAnim("");
        setPointsAnim("");
        setSubtitleAnim("");
    }

    return (
        <div className="pointbubble">
            <img
                className={`overlay bubbleimg ${bubbleImgAnim}`}
                onAnimationEnd={animationsEnd}
                src={pointlogo}
                alt="PointBackground" />
            <div className="overlay points">
                <h1
                    className={`point-number ${pointsAnim}`}
                >
                    <NumberEasing
                        value={currentPoints}
                        speed={1000}
                        decimals={0}
                    />
                </h1>
                <h2
                    className={`point-text ${subtitleAnim}`}>
                    {props.points === 1 ? "POINT" : "POINTS"}
                </h2>
            </div>
        </div>
    )

}

export default Pointbubble