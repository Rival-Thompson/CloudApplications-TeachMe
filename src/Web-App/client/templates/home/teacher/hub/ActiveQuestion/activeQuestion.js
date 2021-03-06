Meteor.subscribe('user');

let activeQuestion = null;
let answers = [];
let aantalPerOption = [];
let chartData = [];
let tokenActive = null;
let wordcloudDiv;
let chartDiv;
let ratingDep = new Tracker.Dependency;
let rating;
let qstDep = new Tracker.Dependency;
let qstActive;

endButton = false;
endButtonDep = new Tracker.Dependency;

drawWordCloud = function (drawSpot) {
    //console.log("Draw this");
    if (!!answers) {
        WordCloud(drawSpot, {
            list: answers,
            backgroundColor: "transparent",
            wait: 250,
            gridSize: 15,
            fontWeight: "700",
            shuffle: true,
            color: function () {
                const rand = Math.floor(Math.random() * 10);
                if (rand >= 5) {
                    return '#00B6FF'
                } else {
                    return ' #078ec4'
                }
            },
            drawOutOfBound: true
        });
    }
};

drawChart = function (drawspot) {
    c3.generate({
        bindto: drawspot,
        data: {
            columns: chartData,
            type: 'pie',
            color: {
                pattern: [
                    '#ff7f0e', '#ffbb78', '#2ca02c',
                    '#98df8a', '#d62728', '#ff9896',
                    '#9467bd', '#c5b0d5', '#8c564b',
                    '#c49c94', '#e377c2', '#f7b6d2',
                    '#7f7f7f', '#c7c7c7', '#bcbd22',
                    '#dbdb8d', '#17becf', '#9edae5'
                ]
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
};

updateData = function (activeqst) {
    if (activeqst.type === "Open") {
        let ratings = 0;
        if (activeqst.answers) {
            for (i = 0; i < activeqst.answers.length; i++) {
                if (activeqst.answers[i].antw.length <= 60) {
                    answers[i] = [activeqst.answers[i].antw, 30];
                } else if (activeqst.answers[i].antw.length <= 80) {
                    answers[i] = [activeqst.answers[i].antw, 25];
                }
                else if (activeqst.answers[i].antw.length <= 100) {
                    answers[i] = [activeqst.answers[i].antw, 21];
                }
                else if (activeqst.answers[i].antw.length <= 120) {
                    answers[i] = [activeqst.answers[i].antw, 17];
                } else {
                    answers[i] = [activeqst.answers[i].antw, 14];
                }


                ratings += parseInt(activeqst.answers[i].rating);
            }
            rating = Math.round(ratings / activeqst.answers.length);
            ratingDep.changed();
            //console.log(rating);
        } else console.log("No answers yet");
    }
    else if (activeqst.type === "MP") {
        let ratings = 0;
        if (activeqst.answers) {
            for (let i = 0; i < activeqst.options.length; i++) {
                chartData[i] = [activeqst.options[i].text, 0];
                aantalPerOption[i] = 0;
                for (let j = 0; j < activeqst.answers.length; j++) {
                    if (activeqst.options[i].num === parseInt(activeqst.answers[j].antw)) {
                        aantalPerOption[i]++;
                        ratings += parseInt(activeqst.answers[j].rating);
                        //console.log("Option " + activeqst.options[i].num + ": " + activeqst.options[i].text + " komt " + aantalPerOption[i] + " keer voor");
                    }
                }
                chartData[i] = [activeqst.options[i].text, aantalPerOption[i]];
                //console.log(chartData[i]);
            }
            rating = Math.round(ratings / activeqst.answers.length);
            ratingDep.changed();
            //console.log(rating);
        } else console.log("No answers yet");
    }
    else if (activeqst.type === "Code") {
        let ratings = 0;
        if (activeqst.answers) {
            for (i = 0; i < activeqst.answers.length; i++) {
                ratings += parseInt(activeqst.answers[i].rating);
            }
            rating = Math.round(ratings / activeqst.answers.length);
            ratingDep.changed();
            //console.log(rating);
        } else console.log("No answers yet");
    }

    qstActive = activeqst;
    qstDep.changed();
};

Template.homeTeacherHubActiveQuestion.helpers({
    thisLesson: function () {
        tokenActive = null;
        if (tokenActive == null || tokenActive == undefined) {
            tokenActive = Router.current().params.token;
        }
        lesson = Lessons.findOne({token: tokenActive});
        //console.log(lesson);
        if (!!lesson) {
            lesson.questions.forEach(function (qst, index) {
                if (qst.num == lesson.activequestion) updateData(qst);
            });
        }

        return lesson;
    },
    thisActiveQuestion: function () {
        qstDep.depend();

        if (!!wordcloudDiv && qstActive.type == "Open")
            drawWordCloud(wordcloudDiv);

        else if (!!chartDiv && qstActive.type == "MP")
            drawChart(chartDiv);
            qstActive.question = new Handlebars.SafeString(qstActive.question);

        return qstActive;
    },
    getRating: function () {
        ratingDep.depend();
        return rating;
    },
    showEndLessonPopup: function () {
        endButtonDep.depend();
        console.log("endbutton: " + endButton);
        return endButton;
    }
});

Template.homeTeacherHubActiveQuestion.rendered = function () {
    Meteor.subscribe('studentLesson', tokenActive);
};

Template.HTHAOpenQuest.rendered = function () {
    if (!wordcloudDiv) {
        wordcloudDiv = document.getElementById("HTHA-open-canvas");
        //console.log("wordcloudDiv exists!");
        qstDep.changed();
    }
};

Template.HTHAMPQuest.rendered = function () {
    if (!chartDiv) {
        chartDiv = document.getElementById("chartMP");
        //console.log("chartDiv exists!");
        qstDep.changed();
    }
};

Template.navTeacherActiveLesson.rendered = function () {
    if (!endButton) {
        endButton = false;
        endButtonDep.changed();
    }
};

Template.navTeacherActiveLesson.events({
    "click #endLessonBtn"(event){
        if (!endButton) endButton = true;
        console.log("activated!");
        endButtonDep.changed();
    },
    "click #hubBtn"(event){
        Router.go('homeTeacherHub', {token: lesson.token});
    }
});
