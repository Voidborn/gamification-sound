var data = {
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "radiogroup",
        "name": "turnoff",
        "title": "Did you turn off the volume during the experiment?",
        "isRequired": true,
        "choices": [
         {
          "value": "No",
          "text": "No"
         }
        ],
        "hasOther": true,
        "otherText": "Yes (please explain why?)"
       },
       {
        "type": "rating",
        "name": "Valence",
        "title": "Please rate how happy you felt while marking the traffic signs, according to the image below",
        "isRequired": true,
        "rateMax": 9,
        "minRateDescription": "Unhappy",
        "maxRateDescription": "Happy"
       },
       {
        "type": "html",
        "name": "InfotextValence",
        "html": "<img src='https://i.postimg.cc/m289Krpq/Valence-Title2.png' border='0' alt='Valence-Title' width='700'>\n<br/>\n<small>This scale is the happy-unhappy scale, which ranges from a smile to a frown. At one extreme of the happy vs. unhappy scale, you felt happy, pleased, satisfied, contented, hopeful. If you felt completely happy while marking traffic signs, you can indicate this by selecting a 9. The other end of the scale is when you felt completely unhappy, annoyed, unsatisfied, melancholic, despaired, bored. You can indicate feeling completely unhappy by selecting a 1. The figures also allow you to describe intermediate feelings of pleasure, by choosing a number in between. If you felt completely neutral, neither happy nor sad, select a 5.\nIf, in your judgment, your feeling of pleasure or displeasure falls between two of the pictures, then select a number between the figures. This permits you to make more finely graded ratings of how you feel in reaction to the pictures. </small>"
       },
       {
        "type": "rating",
        "name": "Arousal",
        "title": "Please rate how excited you felt while marking the traffic signs in this application, according to the image below",
        "isRequired": true,
        "rateMax": 9,
        "minRateDescription": "Calm",
        "maxRateDescription": "Excited"
       },
       {
        "type": "html",
        "name": "question3",
        "html": "<img src='https://i.postimg.cc/bws9zfWj/Arousal-Title.png' border='0' alt='Arousal-Title' width='700'>\n<br/>\n<small>This is the excited vs. calm scale. At one extreme of the scale you felt stimulated, excited, frenzied, jittery, wide-awake, aroused. If you felt completely aroused while marking the traffic signs, select the number 9. On the other hand, at the other end of the scale, you felt completely relaxed, calm, sluggish, dull, sleepy, unaroused. You can indicate you felt completely calm by selecting the number 1. As with the happy-unhappy scale, you can represent intermediate levels by selecting numbers in between. If you are not at all excited nor at all calm, select the number 5. Again, if you wish to make a more finely tuned rating of how excited or calm you feel, select a number between the figures.</small>"
       }
      ],
      "title": "General questions",
      "description": "Please answer the following questions as honest as possible:"
     }
    ],
    "showCompletedPage":false
}
export default data;