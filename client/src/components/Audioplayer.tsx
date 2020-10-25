import React, { Component } from "react";
import { Howl } from "howler";
import { getSoundUrl } from "../api";

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
            <button
                onClick={() =>
                    soundPlay(getSoundUrl(props.sound))
                }
                className="btn"
            >
                Play Sound 
            </button>
            </div>
    }

    return (
        <RenderButtonSound />
    )
    
}

export default Audioplayer;