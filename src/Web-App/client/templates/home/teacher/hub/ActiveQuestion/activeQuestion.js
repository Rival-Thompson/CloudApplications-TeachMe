var activeQuestion = null;
var activeQuestionDep = new Tracker.Dependency;
var answers = [];
var aantalPerOption = [];
var chartData = [];

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
                } else if (activeQuestion.type === "MP") {
                    var ratings = 0;
                    for (i = 0; i < activeQuestion.options.length; i++) {
                        chartData[i] = [activeQuestion.options[i].text, 0];
                        aantalPerOption[i] = 0;
                        for (j = 0; j < activeQuestion.answers.length; j++) {
                            if (activeQuestion.options[i].num === parseInt(activeQuestion.answers[j].antw)) {
                                aantalPerOption[i]++;
                                ratings += parseInt(activeQuestion.answers[j].rating);
                                console.log("Vraag " + activeQuestion.options[i].num + ": " + activeQuestion.options[i].text + " komt " + aantalPerOption[i] + " keer voor");
                            }
                        }
                        chartData[i] = [activeQuestion.options[i].text, aantalPerOption[i]];
                        //console.log(chartData[i]);
                    }
                    activeQuestion.rating = Math.round(ratings / activeQuestion.answers.length);
                    //console.log(chartData);
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
                ["opvulling", 10],
                ["extra", 50],
            ],
            type: 'pie',
            color: {
                pattern: [
                    '#ff7f0e', '#ffbb78', '#2ca02c',
                    '#98df8a', '#d62728', '#ff9896',
                    '#9467bd', '#c5b0d5', '#8c564b',
                    '#c49c94', '#e377c2', '#f7b6d2',
                    '#7f7f7f', '#c7c7c7', '#bcbd22',
                    '#dbdb8d', '#17becf', '#9edae5']
            }
        },
        pie: {
            label: {
                format: function (value) {
                    return d3.format()(value);
                }
            }
        }
    });

    setTimeout(function () {
        chart.unload({
            ids: 'opvulling'
        });
    }, 2000);

    setTimeout(function () {
        chart.unload({
            ids: 'extra'
        });
    }, 1000);

    setTimeout(function () {
        chart.load({
            columns: chartData
        });
    }, 1500);

};