import React from 'react'
import * as Survey from 'survey-react'



Survey.StylesManager.applyTheme("orange");


interface IProps {
    submitData(arg0:string,arg1:any): void,
    surveyJson: Object,
    questionId: string
}

const DemographicsQ = (props: IProps) => {

    const sendDataToServer = (survey: any) => {
        //send Ajax request to your web server.
        props.submitData(props.questionId,survey.data);
    }

    return (
        <div className="flexrow surveybox" style={{marginBottom: "300px"}}>
            <Survey.Survey
                json={props.surveyJson}
                onComplete={sendDataToServer} />
        </div>
    )
}

export default DemographicsQ