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
                } else if (activeQuestion.type === "MP"){

                }
            }
        }
    );


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

Template.HTHAMPQuest.rendered = function () {
    var chart = c3.generate({
        bindto: '#chartMP',
        data: {
            // iris data from R
            columns: [
                ['data1', 30],
                ['data2', 120],
            ],
            type : 'pie',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
    });
    setTimeout(function () {
        chart.load({
            columns: [
                ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
            ]
        });
    }, 1500);

    setTimeout(function () {
        chart.unload({
            ids: 'data1'
        });
        chart.unload({
            ids: 'data2'
        });
    }, 2500);
};