import React, { useState } from "react";
import { Howl } from "howler";
import { getSoundUrl } from "../api";
import playbutton from '../img/playbutton.svg';

const Audioplayer = (props: { sound: string }) => {
    const [src] = useState(getSoundUrl(props.sound));
    const [sound] = useState(new Howl({
        src,
        html5: true
    }))

    const soundPlay = () => {
        if (!sound.playing()) {
            sound.play();
        } else {
            sound.stop();
            sound.play();
        }
    }

    const RenderButtonSound = () => {
        return <div>
            <img
                src={playbutton}
                className="playbtn"
                width="100px"
                alt="PLAY"
                onClick={() =>
                    soundPlay()
                }
            />
            </div>
    }

    return (
        <RenderButtonSound />
    )
    
}

export default Audioplayer;