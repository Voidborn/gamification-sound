import React from 'react';

import { fetchNextImage } from '../api';
import { Image } from '../interfaces/imageInterface'


interface IProps{
    userId: number,
    addPoints(arg0:number):void
}

interface IState{
    image: Image,
    userId: number
}

class Imagegrid extends React.Component<IProps,IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            image: {
                path: "img/traffic-signs/road536.png",
                points: [0, 5, 10, 0, 5, 10, 0, 5, 10, 0, 0, 0],
                marked: [false,false,false,false,false,false,false,false,false,false,false,false]
            },
            userId: this.props.userId
        }
    }

    async getNextImage() {
        console.log("1");
        let newImage = await fetchNextImage(this.state.userId);
        console.log(newImage);
        this.setState({
            image: await newImage,
            userId: this.state.userId
        })
    }

    markImage(index: number): void {
        let newMarked = this.state.image.marked.slice();
        
        newMarked[index] = !newMarked[index];
        
        this.setState({
            image: {
                path: this.state.image.path.slice(),
                points: this.state.image.points.slice(),
                marked: newMarked
            },
            userId: this.state.userId
        })
    }

    render() {
        return (
            <div className="image-rating">
                <div className="image-container">
                    <div>
                        <img className="traffic-image" src={this.state.image.path} alt="trafficsign" width="300" height="400" />
                    </div>
                    <div className="overlay image-overlay">
                        <div className="grid-row">
                            {this.state.image.points.map((i, index) =>
                                <img
                                    className="cell"
                                    key={index}
                                    src={this.state.image.marked[index] ? "img/selected-cell.svg" : "img/unselected-cell.svg"}
                                    alt="grid cell"
                                    onClick={(event) => this.markImage(index)}
                                />
                            )}
                        </div>
                    </div>     
                </div> 
                <div className="image-container">
                    <button
                        className="btn" onClick={(event) => {this.getNextImage()}}>
                        <h1>NEXT IMAGE</h1>
                    </button>
                </div>
            </div>
        )
    }
}

export default Imagegrid