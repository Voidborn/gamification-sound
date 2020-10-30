import React from "react";
import { Howl } from "howler";
import { getSoundUrl } from "../api";
import playbutton from '../img/playbutton.svg';

const Audioplayer = (props: {sound: string}) =>{
    const soundPlay = (src: string) => {
        const sound = new Howl({
            src,
            html5: true
        })
        sound.play();
    }

    const RenderButtonSound = () => {
        return <div>
            <img
                src={playbutton}
                className="playbtn"
                width="100px"
                alt="PLAY"
                onClick={() =>
                    soundPlay(getSoundUrl(props.sound))
                }
            />
            </div>
    }

    return (
        <RenderButtonSound />
    )
    
}

export default Audioplayer;