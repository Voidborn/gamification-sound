import React, { Component } from "react";
import { Howl } from "howler";
import { getSoundUrl } from "../api";

class Audioplayer extends Component {

    soundPlay = (src: string) => {
        const sound = new Howl({
            src,
            html5: true
        })
        sound.play();
    }

    RenderButtonSound = () => {
        return <button onClick={() => this.soundPlay(getSoundUrl("AmajDrum.mp3"))}>BLA BLA </button>
    }

    render() {
        return (
            <this.RenderButtonSound />
        )
    }
}

export default Audioplayer;