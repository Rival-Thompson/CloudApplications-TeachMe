var activeQuestion = null;
var activeQuestionDep = new Tracker.Dependency;
var answers = [];

Template.homeTeacherHubActiveQuestion.helpers({
    thisActiveQuestion: function () {
        activeQuestionDep.depend();
        return activeQuestion;
    }
});

Template.homeTeacherHubActiveQuestion.rendered = function () {
    var token = Router.current().params.token;
    Meteor.call("sendActiveQuestion", token, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Response: " + JSON.stringify(response.questions));
            activeQuestion = response.questions[0];
            activeQuestionDep.changed();

            //console.log(activeQuestion.answers);
            for (i = 0; i < activeQuestion.answers.length; i++) {
                answers[i] = [activeQuestion.answers[i].antw, Math.floor(Math.random() * 20) + 8];
                //console.log(answers[i]);
            }
            console.log(answers);

            WordCloud(document.getElementById('canvas'),
                {list: answers, backgroundColor: "transparent", wait: 250,
                    gridSize: Math.round(16 * $('#canvas').height() / 1024)
                });
        }
    });

    /*var chart = c3.generate({
     bindto: '#chart',
     data: {
     columns: [
     ['data1', 30, 200, 100, 400, 150, 250],
     ['data2', 50, 20, 10, 40, 15, 25]
     ]
     }
     });
     */
};