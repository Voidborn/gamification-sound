var data = {
    "pages":[{
        "name": "page1",
        "elements": [
            {
                "type": "radiogroup",
                "name": "gender",
                "title": "To which gender do you most identify?",
                "isRequired": true,
                "choices": [
                    { "value": "male", "text": "Male" }, 
                    { "value": "female", "text": "Female" }, 
                    { "value": "notSaying", "text": "Prefer not to say" }],
                "hasOther": true,
                "otherText": "Prefer to self-describe: (describe)"
            },
            {
                "type": "radiogroup",
                "name": "age",
                "title": "How old are you?",
                "isRequired": true,
                "choices": [
                    { "value": "under18", "text": "< 18" },
                    { "value": "18-24", "text": "18-24" },
                    { "value": "25-31", "text": "25-31" },
                    { "value": "32-38", "text": "32-38" },
                    { "value": "39-45", "text": "39-45" },
                    { "value": "46-52", "text": "46-52" },
                    { "value": "53-59", "text": "53-59" },
                    { "value": "over59", "text": "> 59" }]
            },
            {
                "type": "text",
                "name": "nationality",
                "title": "Nationality:",
                "isRequired": true,
        }],
        "title": "Demographics"
    }],
    "showCompletedPage":false
  }
  
export default data