Meteor.subscribe('user');

let activeQuestion = null;
let answers = [];
//let aantalPerOption = [];
let chartData = [];
let token;
let currentActiveLesson;
let wordcloudDiv;
let ratingDep = new Tracker.Dependency;
let rating;
let qstDep = new Tracker.Dependency;
let qstActive;

drawWordCloud = function (drawSpot) {
    console.log("Draw this");
    WordCloud(drawSpot, {
        list: answers,
        backgroundColor: "transparent",
        wait: 250,
        gridSize: 15,
        fontWeight: "bold",
        shuffle: true
    });
};

updateData = function (activeqst) {
    if (activeqst.type === "Open") {
        let ratings = 0;
        if (activeqst.answers) {
            for (i = 0; i < activeqst.answers.length; i++) {
                answers[i] = [activeqst.answers[i].antw, 25];
                ratings += parseInt(activeqst.answers[i].rating);
            }
            rating = Math.round(ratings / activeqst.answers.length);
            ratingDep.changed();
            console.log(rating);

            qstActive = activeqst;
            qstDep.changed();

        } else console.log("No answers yet");
    }
};

Template.homeTeacherHubActiveQuestion.helpers({
    thisLesson: function () {
        console.log("thisLesson");
        if(!token) {
            token = Router.current().params.token;
            console.log(token);
        }

        currentActiveLesson = Lessons.findOne({token: token});
        console.log(currentActiveLesson);
        if (!!currentActiveLesson) {
            currentActiveLesson.questions.forEach(function (qst, index) {
                if (qst.num == currentActiveLesson.activequestion) {
                    console.log(qst);
                    updateData(qst)
                }
            });
        }

        return currentActiveLesson;
    },
    thisActiveQuestion: function () {
        console.log("thisActiveQuestion");
        qstDep.depend();

        if (!!wordcloudDiv && qstActive.type == "Open")
            drawWordCloud(wordcloudDiv);

        return qstActive;
    },
    getRating: function () {
        console.log("getRating");
        ratingDep.depend();
        return rating;
    }
});

Template.homeTeacherHubActiveQuestion.rendered = function () {
    Meteor.subscribe('studentLesson', token);
    console.log("homeTeacherHubActiveQuestion");
};

Template.HTHAOpenQuest.rendered = function () {
    if (!wordcloudDiv) {
        wordcloudDiv = document.getElementById("HTHA-open-canvas");
        console.log("wordcloudDiv exists!");
        qstDep.changed();
    }
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