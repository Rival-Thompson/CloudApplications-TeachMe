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
    selected.question = template.find('#HTH_InputQuestion').value;
    selected.type = template.find('#HTH_SelectType').value;
    console.log(selected);
    Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});
    console.log("questions saved");

    selectedDep.changed();
};

Template.homeTeacherHub.events({
    "click #HTH_AddQuestion"(){
        lesson.questions.push({type: "Open", question: "new question", num: lesson.questions.length + 1});
        lessonDep.changed();
        console.log("added question");

        tabsHeight = $("#HTH_tabs").height() + 100 + "px";
        console.log(tabsHeight + ": tabheight");
        tabsHeightDep.changed();

        Lessons.update({_id: lesson._id}, {$set: {questions: lesson.questions}});
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
    }
});

Template.HTH_optInp.events({
    "click .HTH_OptionRemove"(event, template){
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
