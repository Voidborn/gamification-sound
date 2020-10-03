import React from 'react'
import * as Survey from 'survey-react'



Survey.StylesManager.applyTheme("orange");


interface IProps {
    submitData(arg0:any): void,
    surveyJson: Object
}

const DemographicsQ = (props: IProps) => {

    const sendDataToServer = (survey: any) => {
        //send Ajax request to your web server.
        props.submitData(survey.data);
    }

    return (
        <div className="grid-row">
            <Survey.Survey
                json={props.surveyJson}
                onComplete={sendDataToServer} />
        </div>
    )
}

export default DemographicsQ