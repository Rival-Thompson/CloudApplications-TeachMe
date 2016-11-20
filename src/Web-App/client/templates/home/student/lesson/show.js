/**
 * Created by Rival on 25/10/2016.
 */
Meteor.subscribe('user');
var editor;
var editor2;

var isAnswered = null;
var isAnsweredDep = new Tracker.Dependency;

Template.registerHelper('zelfde', (a, b)=> {
    return a == b;
});

Template.registerHelper('notNull', (a)=> {
    return !!(a != null && a != undefined);


});
Template.homeStudentLesson.helpers({
    thisLesson: function () {
        console.log("selected lesson update");
        let thislesson =Lessons.findOne();
        if( parseInt($.cookie('questionnum')) == parseInt(thislesson.activequestion) && $.cookie('lessonId') == thislesson._id ){
            isAnswered = true;
            isAnsweredDep.changed();
        }else {
            console.log("Got new question");
            isAnswered = false;
            isAnsweredDep.changed();
        }
        return thislesson;
    },
    selectedquestion: function () {
        //console.log("selected quest update");
        let thislesson =Lessons.findOne();
        if( parseInt($.cookie('questionnum')) == parseInt(thislesson.activequestion) ){
            isAnswered = true;
            isAnsweredDep.changed();
        }else {
            console.log("Got new question");
            isAnswered = false;
            isAnsweredDep.changed();
        }

        let qst =ReactiveMethod.call('getQuestion',{token:thislesson.token,num:thislesson.activequestion});
        if(editor2 && qst.type == "Code")editor2.setValue(qst.QuestExample);
        return qst
    },
    qstAnswered: function () {
        isAnsweredDep.depend();
        return isAnswered;
    }

});

Template.homeStudentLesson.events({
    "click #HSL_SaveMPAnswer"(event,template){
        console.log("Saving answers");

        let antwoord, beoordeling;
        let rating = template.find("input[name$='rating']:checked");
        if(!!rating){
           //console.log(rating.value);
            beoordeling = rating.value;
        }else{
            //console.log(0);
            beoordeling = 0
        }

        let question = template.find("input[name$='mp']:checked");
        if(!!question){
            //console.log(question.value);
            antwoord = question.value;
        }else{
            //console.log("NONE");
            antwoord = null;
        }

        if(!!antwoord){
            let thislesson =Lessons.findOne();
            let answ = {antw: antwoord,rating: beoordeling};
            saveAnswer(answ,thislesson._id,thislesson.activequestion);
        }else {
            sAlert.warning("Please select an answer")
        }


    }
    ,"click #HSL_SaveOpenAnswer"(event,template){
        console.log("Saving answers");

        let antwoord, beoordeling;
        let rating = template.find("input[name$='rating']:checked");
        if(!!rating){
            console.log(rating.value);
            beoordeling = rating.value;
        }else{
            console.log(0);
            beoordeling = 0
        }

        antwoord = template.find("#HSL-Open-Input").value;

        if (!!antwoord || antwoord!=""){
            let thislesson =Lessons.findOne();
            let answ = {antw: antwoord,rating: beoordeling};
            saveAnswer(answ,thislesson._id,thislesson.activequestion);
        }else{
            sAlert.warning("Please fill in an answer before submitting");
        }


    }
    ,"click #HSL_SaveCodeAnswer"(event,template){
        let antwoord, beoordeling;
        let rating = template.find("input[name$='rating']:checked");
        if(!!rating){
            console.log(rating.value);
            beoordeling = rating.value;
        }else{
            console.log(0);
            beoordeling = 0
        }

        if(!!editor){
            antwoord = editor.getValue();
        }else{
            antwoord = null;
        }


        if (!!antwoord || antwoord!=""){
            let thislesson =Lessons.findOne();
            let answ = {antw: antwoord,rating: beoordeling};
            saveAnswer(answ,thislesson._id,thislesson.activequestion);
        }else{
            sAlert.warning("Please fill in an answer before submitting");
        }
    }
    ,"click #ENDLESSON"(event,tempate){
        Router.go("homeStudentToken");
    }

    });

 saveAnswer = function (answer, lessonid, num) {
    Meteor.call('pushAnswer',{answer:answer,id:lessonid,num:num},(err,res)=> {
        if (err){
            sAlert.error("an error occured while saveing your answer: " +err.message);
        }else {
            sAlert.success("Answer Saved");
            $.cookie('questionnum', num, { expires: 1, path: '/student/lesson' });
            $.cookie('lessonId', lessonid, { expires: 1, path: '/student/lesson' });
            isAnswered = true;
            isAnsweredDep.changed();
        }
    })
};

Template.homeStudentLesson.rendered = function () {
    var self = this;
    var token = Router.current().params.token;
    console.log("the awesome token is: " + token);
        Meteor.subscribe('studentLesson',token);

};

Template.HSL_CodeQuestion.rendered = function () {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/cobalt");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setValue("");
    console.log("editting: " + editor);

    editor2 = ace.edit("editor2");
    editor2.setTheme("ace/theme/monokai");
    editor2.getSession().setMode("ace/mode/javascript");
};