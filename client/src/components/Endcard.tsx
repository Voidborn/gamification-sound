import React from "react";

const Endcard = () => {
    return (
        <div className="flexcol">
        <div className="textbubble">
          <div className="bubblecontent" style={{ marginBottom: "10px" }}>
            <p style={{textAlign: "center"}}>
            <h3>Thank you for participating in this survey!</h3>
              If you have any questions or remarks, contact us at:
              <br />
              <a href="maximilian.altmeyer@dfki.de">maximilian.altmeyer@dfki.de</a>.
            </p>
          </div>     
        </div>
        <button 
                    className="btn" 
                    onClick={
                        (event) => { window.location.replace("https://app.prolific.co/submissions/complete?cc=7ABAD1B8")}
                    }>
                    <p className="btnlabel">Return to Prolific</p>
            </button>
        </div>
    )
}


export default Endcard;