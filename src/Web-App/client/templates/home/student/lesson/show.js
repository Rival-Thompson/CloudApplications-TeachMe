/**
 * Created by Rival on 25/10/2016.
 */

Deps.autorun(function () {
    Meteor.subscribe('user');
});

let editor;
let editor2;

let isAnswered = null;
const isAnsweredDep = new Tracker.Dependency;

Template.registerHelper('zelfde', (a, b) => {
    return a == b;
});

Template.registerHelper('notNull', (a) => {
    return !!(a != null && a != undefined);


});
Template.homeStudentLesson.helpers({
    thisLesson: function () {
        //console.log("selected lesson update");
        const thislesson = Lessons.findOne();
        if (thislesson != null && thislesson != undefined) {
            //console.log('ThisLesson ' + $.cookie('lessonId') + ' ==' + thislesson._id);
            checkQuestionAnswered(thislesson);
        }
        return thislesson;
    },
    selectedquestion: function () {
        //console.log("selected quest update");
        const thislesson = Lessons.findOne();
        if (thislesson != null && thislesson != undefined) {
            //console.log('selectedQuestion '+$.cookie('lessonId')+' =='+ thislesson._id);
            checkQuestionAnswered(thislesson);

            const qst = ReactiveMethod.call('getQuestion', {token: thislesson.token, num: thislesson.activequestion});
            if (editor2 && qst.type == "Code") editor2.setValue(qst.QuestExample);

            qst.question = new Handlebars.SafeString(qst.question);
            return qst
        }

    },
    qstAnswered: function () {
        isAnsweredDep.depend();
        //console.log("is this question answered? " + isAnswered);
        return isAnswered;
    }

});

Template.homeStudentLesson.events({
    "click #HSL_SaveMPAnswer"(event, template){
        //console.log("Saving answers");

        let antwoord, beoordeling;
        const rating = template.find("input[name$='rating']:checked");
        if (!!rating) {
            //console.log(rating.value);
            beoordeling = rating.value;
        } else {
            //console.log(0);
            beoordeling = 0
        }

        const question = template.find("input[name$='mp']:checked");
        if (!!question) {
            //console.log(question.value);
            antwoord = question.value;
        } else {
            //console.log("NONE");
            antwoord = null;
        }

        if (!!antwoord) {
            const thislesson = Lessons.findOne();
            const answ = {antw: antwoord, rating: beoordeling};
            saveAnswer(answ, thislesson._id, thislesson.activequestion);
        } else {
            sAlert.warning("Please select an answer")
        }


    }
    , "click #HSL_SaveOpenAnswer"(event, template){
        //console.log("Saving answers");

        let antwoord, beoordeling;
        const rating = template.find("input[name$='rating']:checked");
        if (!!rating) {
            //console.log(rating.value);
            beoordeling = rating.value;
        } else {
            //console.log(0);
            beoordeling = 0
        }

        antwoord = template.find("#HSL-Open-Input").value;

        if (!!antwoord || antwoord != "") {
            const thislesson = Lessons.findOne();
            const answ = {antw: antwoord, rating: beoordeling};
            saveAnswer(answ, thislesson._id, thislesson.activequestion);
        } else {
            sAlert.warning("Please fill in an answer before submitting");
        }


    }
    , "click #HSL_SaveCodeAnswer"(event, template){
        let antwoord, beoordeling;
        const rating = template.find("input[name$='rating']:checked");
        if (!!rating) {
            //console.log(rating.value);
            beoordeling = rating.value;
        } else {
            //console.log(0);
            beoordeling = 0
        }

        if (!!editor) {
            antwoord = editor.getValue();
        } else {
            antwoord = null;
        }


        if (!!antwoord || antwoord != "") {
            const thislesson = Lessons.findOne();
            const answ = {antw: antwoord, rating: beoordeling};
            saveAnswer(answ, thislesson._id, thislesson.activequestion);
        } else {
            sAlert.warning("Please fill in an answer before submitting");
        }
    }
    , "click #ENDLESSON"(event, tempate){
        Router.go("homeStudentToken");
    }

});

saveAnswer = function (answer, lessonid, num) {
    Meteor.call('pushAnswer', {answer: answer, id: lessonid, num: num}, (err, res) => {
        if (err) {
            sAlert.error("an error occured while saveing your answer: " + err.message);
        } else {
            sAlert.success("Answer Saved");
            $.cookie('questionnum', num, {expires: 1});
            $.cookie('lessonId', lessonid, {expires: 1});
            isAnswered = true;
            isAnsweredDep.changed();
        }
    })
};

checkQuestionAnswered = function (thislesson) {
    if (!!$.cookie('questionnum') && $.cookie('questionnum') != null && $.cookie('questionnum') != undefined
        && !!$.cookie('lessonId') && $.cookie('lessonId') != null && $.cookie('lessonId') != undefined) {
        if (parseInt($.cookie('questionnum')) == parseInt(thislesson.activequestion) && $.cookie('lessonId') == thislesson._id) {
            isAnswered = true;
            isAnsweredDep.changed();
        } else {
            //console.log("Got new question");
            isAnswered = false;
            isAnsweredDep.changed();
        }
    }
};

Template.homeStudentLesson.rendered = function () {

    Deps.autorun(function () {
        const token = Router.current().params.token;
        //console.log("the awesome token is: " + token);
        Meteor.subscribe('studentLesson', token);
    });

};

Template.HSL_CodeQuestion.rendered = function () {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/cobalt");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setValue("");
    //console.log("editting: " + editor);

    editor2 = ace.edit("editor2");
    editor2.setTheme("ace/theme/monokai");
    editor2.getSession().setMode("ace/mode/javascript");
};
