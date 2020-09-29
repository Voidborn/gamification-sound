import React from 'react';

interface IProps{

}

interface ImageState {
    path: string,
    points: number[],
    marked: boolean[]
}

class Imagegrid extends React.Component<IProps,ImageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            path: "img/traffic-signs/road536.png",
            points: [0, 5, 10, 0, 5, 10, 0, 5, 10, 0, 0, 0],
            marked: [false,false,false,false,false,false,false,false,false,false,false,false]
        }
    }

    markImage(index: number): void {
        let newMarked = this.state.marked.slice();
        
        newMarked[index] = !newMarked[index];
        console.log(this.state.marked)
        this.setState({
            marked: newMarked
        })
    }

    render() {
        return (
            <div className="image-rating">
                <div className="image-container">
                    <div>
                        <img className="traffic-image" src={this.state.path} alt="trafficsign" width="300" height="400" />
                    </div>
                    <div className="overlay image-overlay">
                        <div className="grid-row">
                            {this.state.points.map((i, index) =>
                                <img
                                    className="cell"
                                    key={index}
                                    src={this.state.marked[index] ? "img/selected-cell.svg" : "img/unselected-cell.svg"}
                                    alt="grid cell"
                                    onClick={(event) => this.markImage(index)}
                                />
                            )}
                        </div>
                    </div>     
                </div> 
                <div className="image-container">
                    <button className="btn"><h1>NEXT IMAGE</h1></button>
                </div>
            </div>
        )
    }
}

export default Imagegrid