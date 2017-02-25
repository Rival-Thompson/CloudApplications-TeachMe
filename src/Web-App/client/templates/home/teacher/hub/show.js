Meteor.subscribe('user');

let lessonDep = new Tracker.Dependency;
let selected = null;
let selectedDep = new Tracker.Dependency;

let tabsHeight = $("#HTH_tabs").height() + 50 + "px";
let tabsHeightDep = new Tracker.Dependency;

endButton = false;
endButtonDep = new Tracker.Dependency;


Template.registerHelper('zelfde', (a, b) => {
    return a == b;
});

Template.registerHelper('not', (a) => {
    return !a;
});

saveQuestions = function (template) {
    if (selected) {
        selected.question = template.find('#HTH_InputQuestion').value.replace(/(\n|\r\n)/g, "<br>");
        selected.question = selected.question.replace("<br><br>","<br>");
        selected.type = template.find('#HTH_SelectType').value;
        //console.log(selected);
        if (selected.type === "MP") {
            selected.options.forEach(function (option, index) {
                //console.log(option);
                id = '#HTH_OptionInput' + option.num;
                option.text = template.find(id).value;
            });
        }
        if (selected.type === "Code") {
            selected.QuestExample = template.find('#HTH_QuestExample').value;
            //console.log(selected.QuestExample);
        }
        Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});
        //console.log("questions saved");

        selectedDep.changed();
    }
};

RemoveOptions = function (selected) {
    delete selected.options;
    //console.log(selected.options);
};

hidePopUp = function () {
    let url = Router.current().url;
    let token = Router.current().params.token;
    let activeNum = Router.current().params.activeNum;
    if (url.includes(token + "/" + activeNum)) {
        console.log("we zitten in activeqst");
        endButton = false;
    } else {
        console.log("we zitten in show");
        endButton = false;
    }
    endButtonDep.changed();
};

clearDataVariables = function () {
    // alle vorige variabelen  leegmaken
    lesson = selected = null;
    tokenActive = qstActive = rating = wordcloudDiv = chartDiv = null;
    answers = chartData = aantalPerOption = [];
};

Template.homeTeacherHub.events({
    "click #HTH_AddQuestion"(event){
        lesson.questions.push({type: "Open", question: "new question", num: lesson.questions.length + 1});
        lessonDep.changed();
        //console.log("added question");

        tabsHeight = $("#HTH_tabs").height() + 100 + "px";
        //console.log(tabsHeight + ": tabheight");
        tabsHeightDep.changed();
        Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});

        selected = lesson.questions[lesson.questions.length - 1];
        selectedDep.changed();
    },
    "click .HTH_SelectQuest"(event, template){
        saveQuestions(template);
        let result = $.grep(lesson.questions, function (e) {
            return e.num == event.currentTarget.innerText;
        });
        //console.log(result);
        Tracker.flush();
        selected = result[0];
        //$("#HTH_InputQuestion").val(selected.question);
        selectedDep.changed();
    },
    "click #HTH_SaveQuest"(event, template){
        saveQuestions(template);
    },
    "click #HTH_OptionAdd"(event){
        selected.options.push({text: "New option", num: selected.options.length});
        selectedDep.changed();

        tabsHeight = $("#HTH_tabs").height() + 100 + "px";
        tabsHeightDep.changed();

        Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});
    },
    "change #HTH_SelectType"(event){
        let selectType = event.target.value;
        //console.log(selectType);

        if (selectType === 'MP') {
            //console.log(selected);
            selected.type = "MP";
            if (selected.options === undefined) {
                selected.options = [];
            }
        }
        if (selectType === 'Open') {
            selected.type = "Open";
            //console.log(selected);

            RemoveOptions(selected);
        }
        if (selectType === 'Code') {
            selected.type = "Code";
            //console.log(selected);

            RemoveOptions(selected);
        }
        selectedDep.changed();

        tabsHeight = $("#HTH_tabs").height() + 100 + "px";
        tabsHeightDep.changed();
    },
    "click #HTH_DeleteQuest"(event){
        let index = lesson.questions.indexOf(this);
        //console.log("#" + index);

        if (index > -1) {
            lesson.questions.splice(index, 1);
        }

        lesson.questions.forEach(function (question) {
            if (question.num > (index + 1)) {
                question.num = question.num - 1;
            }
        });
        selected = lesson.questions[0];
        selectedDep.changed();
        if (index > lesson.questions.length - 1) {
            selected = lesson.questions[index - 1];
        } else {
            selected = lesson.questions[index];
        }
        selectedDep.changed();
        lessonDep.changed();
        Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});
    },
    "click #HTH_AskQuest"(event, template) {
        saveQuestions(template);
        Lessons.update({_id: lesson._id}, {$set: {activequestion: selected.num}});
        Router.go("homeTeacherHubActiveQuestion", {token: lesson.token, activeNum: selected.num});
    },
    "click #HTH_RemoveAnswers"(event) {
        Meteor.call("removeAnswers", {_id: lesson._id, num: selected.num}, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Answers successfully removed");
            }
        });
    }
});

Template.HTH_optInp.events({
    "click .HTH_OptionRemove"(){
        //console.log(this.option);
        let index = selected.options.indexOf(this.option);
        //console.log(index);
        if (index > -1) selected.options.splice(index, 1);

        selectedDep.changed();
    }
});

Template.homeTeacherHub.helpers({
    thislesson: function () {
        lessonDep.depend();
        return lesson;
    },
    selectedQuestion: function () {
        selectedDep.depend();
        selected.question = selected.question.replace("<br>","\r\n")
        return selected;
    },
    tabsHeight: function () {
        tabsHeightDep.depend();
        return tabsHeight;
    },
    showEndLessonPopup: function () {
        endButtonDep.depend();
        return endButton;
    },
});

Template.homeTeacherHub.rendered = function () {
    Meteor.subscribe('lessons');
    let token = Router.current().params.token;
    Meteor.call("sendLesson", token, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            //console.log("Response: " + JSON.stringify(response));
            lesson = response;

            if (!lesson.questions) {
                lesson.questions = [{
                    type: "Open",
                    question: "New question",
                    num: 1
                }];
            }

            selected = lesson.questions[0];
            lessonDep.changed();
            selectedDep.changed();
            Tracker.flush();
            tabsHeight = $("#HTH_tabs").height() + 50 + "px";
            tabsHeightDep.changed();
        }
    });
};


Template.navTeacherHub.rendered = function () {
    if (!endButton) {
        endButton = false;
        endButtonDep.changed();
    }
};

Template.navTeacherHub.events({
    "click #endLessonBtn"(event){
        if (!endButton) endButton = true;
        endButtonDep.changed();
    }
});

Template.popupEndLesson.events({
    "click #HTH_endSave"(event){
        hidePopUp();
        Lessons.update({_id: lesson._id}, {$set: {activequestion: null}});
        sAlert.success("Lesson saved!", {onRouteClose: false});
        clearDataVariables();
        Router.go("homeTeacherDashboard");
    },
    "click #HTH_endDelete"(event){
        if (!!lesson) {
            Meteor.call("deleteLesson", {token: lesson.token}, (error, response) => {
                if (error) {
                    sAlert.error(error.message);
                    hidePopUp();
                }
                else {
                    hidePopUp();
                    clearDataVariables();

                    sAlert.success("Lesson removed!", {onRouteClose: false});
                    Router.go("homeTeacherDashboard");
                }
            });
        } else sAlert.error("U bricked it!");
    },
    "click #HTH_endCancel"(event){
        hidePopUp();
    }
});
