var lesson = null;
var lessonDep = new Tracker.Dependency;
var selected = null;
var selectedDep = new Tracker.Dependency;
var tabsHeight = $("#HTH_tabs").height() + 50 + "px";
var tabsHeightDep = new Tracker.Dependency;

Template.registerHelper('zelfde', (a, b)=> {
    return a == b;
});

Template.registerHelper('not',(a)=>{
    return !a;
});

saveQuestions = function (template) {
    if (selected) {
        selected.question = template.find('#HTH_InputQuestion').value;
        selected.type = template.find('#HTH_SelectType').value;
        console.log(selected);
        if (selected.type === "MP") {
            selected.options.forEach(function (option, index) {
                console.log(option);
                id = '#HTH_OptionInput' + option.num;
                var optionText = template.find(id).value;
                option.text = optionText;
            });
        }
        if (selected.type === "Code"){
            selected.QuestExample = template.find('#HTH_QuestExample').value;
            console.log(selected.QuestExample);
        }
        Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});
        console.log("questions saved");

        selectedDep.changed();
    }
};

RemoveOptions = function (selected) {
    delete selected.options;
    console.log(selected.options);
};

Template.homeTeacherHub.events({
    "click #HTH_AddQuestion"(event){
        lesson.questions.push({type: "Open", question: "new question", num: lesson.questions.length + 1});
        lessonDep.changed();
        console.log("added question");

        tabsHeight = $("#HTH_tabs").height() + 100 + "px";
        console.log(tabsHeight + ": tabheight");
        tabsHeightDep.changed();
        Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});

        selected = lesson.questions[lesson.questions.length - 1];
        selectedDep.changed();
    },
    "click .HTH_SelectQuest"(event, template){
        saveQuestions(template);
        //console.log(event);
        //console.log(event.currentTarget.innerText);
        var result = $.grep(lesson.questions, function (e) {
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
        console.log(selected.options);
        selected.options.push({text: "New option", num: selected.options.length});
        selectedDep.changed();

        tabsHeight = $("#HTH_tabs").height() + 100 + "px";
        console.log(tabsHeight + ": tabheight");
        tabsHeightDep.changed();

        Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});
    },
    "change #HTH_SelectType"(event){
        var selectType = event.target.value;
        console.log(selectType);

        if (selectType === 'MP'){
            console.log(selected);
            selected.type = "MP";
            if (selected.options === undefined){
                selected.options = [];
            }
        }
        if (selectType === 'Open'){
            selected.type = "Open";
            console.log(selected);

            RemoveOptions(selected);
        }
        if (selectType === 'Code'){
            selected.type = "Code";
            console.log(selected);

            RemoveOptions(selected);
        }
        selectedDep.changed();

        tabsHeight = $("#HTH_tabs").height() + 100 + "px";
        console.log(tabsHeight + ": tabheight");
        tabsHeightDep.changed();
    },
    "click #HTH_DeleteQuest"(event){
        console.log(this);
        var index = lesson.questions.indexOf(this);
        console.log("#" + index);

        if (index > -1){
            lesson.questions.splice(index, 1);
        }

        lesson.questions.forEach(function (question) {
            console.log(question);
            console.log(question.num);
            if (question.num > (index + 1)){
                question.num = question.num - 1;
                console.log(question.num);
            }
        });
        selected = lesson.questions[0];
        selectedDep.changed();
        if (index > lesson.questions.length - 1){
            selected = lesson.questions[index - 1];
        } else {
            selected = lesson.questions[index];
        }
        selectedDep.changed();
        lessonDep.changed();
        Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});
    }
});

Template.HTH_optInp.events({
    "click .HTH_OptionRemove"(){
        console.log(this.option);
        let index = selected.options.indexOf(this.option);
        console.log(index);
        if (index > -1) {
            selected.options.splice(index, 1);
        }
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
        return selected;
    },
    tabsHeight: function () {
        tabsHeightDep.depend();
        return tabsHeight;
    }
});

Template.homeTeacherHub.rendered = function () {
    var token = Router.current().params.token;
    //console.log(token);
    Meteor.call("sendLesson", token, (error, response)=> {
        if (error) {
            console.log(error);
        } else {
            console.log("Response: " + JSON.stringify(response));
            lesson = response;

            if (!lesson.questions){
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
