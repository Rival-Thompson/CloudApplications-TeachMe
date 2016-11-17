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

                if (activeQuestion.type === "Open") {
                    var ratings = 0;
                    for (i = 0; i < activeQuestion.answers.length; i++) {
                        answers[i] = [activeQuestion.answers[i].antw, 25];
                        //console.log(answers[i]);
                        ratings += parseInt(activeQuestion.answers[i].rating);
                    }
                    activeQuestion.rating = Math.round(ratings / activeQuestion.answers.length);
                    console.log(answers);
                }
            }
        }
    );

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

Template.HTHAOpenQuest.rendered = function () {
    WordCloud(document.getElementById("HTHA-open-canvas"), {
        list: answers,
        backgroundColor: "transparent",
        wait: 250,
        gridSize: 15,
        fontWeight: "bold",
        shuffle: true
    });
};