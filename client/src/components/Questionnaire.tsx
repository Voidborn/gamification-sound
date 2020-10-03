import React from 'react'
import * as Survey from 'survey-react'



Survey.StylesManager.applyTheme("orange");


interface IProps {
    submitData(): void,
    surveyJson: Object
}

const DemographicsQ = (props: IProps) => {

    const sendDataToServer = (survey: any) => {
        //send Ajax request to your web server.
        console.log("The results are:" + JSON.stringify(survey.data));
        props.submitData();
    }

    return (
        <Survey.Survey
            json={props.surveyJson}
            onComplete={sendDataToServer} />
    )
}

export default DemographicsQ