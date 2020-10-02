import React, {useState} from 'react'

interface IProps {
    submitData(): void;
}

const DemographicsQ = (props: IProps) => {
    const [gender, setGender] = useState("");

    return (
        <div>
            <div className="grid-row">
                <p>To which gender do you most identify?</p>
                <input />
            </div>
            <div className="grid-row">
                <button className="btn" onClick={(event) => props.submitData()}><h1>NEXT</h1></button>
            </div>
        </div>
    )
}

export default DemographicsQ