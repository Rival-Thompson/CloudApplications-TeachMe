/**
 * Created by Rival on 25/10/2016.
 */
Meteor.subscribe('user');
var editor;
var editor2;

Template.registerHelper('zelfde', (a, b)=> {
    return a == b;
});

Template.registerHelper('notNull', (a)=> {
    return !!(a != null && a != undefined);


});
Template.homeStudentLesson.helpers({
    thisLesson: function () {
        console.log("selected lesson update");
        return Lessons.findOne({})
    },
    selectedquestion: function () {
        //console.log("selected quest update");
        let thislesson =Lessons.findOne();
        let qst =ReactiveMethod.call('getQuestion',{token:thislesson.token,num:thislesson.activequestion});
        if(editor2 && qst.type == "Code")editor2.setValue(qst.QuestExample);
        return qst}
});

Template.homeStudentLesson.events({
    "click #HSL_SaveMPAnswer"(event,template){
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

        let question = template.find("input[name$='mp']:checked");
        if(!!question){
            console.log(question.value);
            antwoord = question.value;
        }else{
            console.log("NONE");
            antwoord = "None given"
        }

        let thislesson =Lessons.findOne();
        let answ = {antw: antwoord,rating: beoordeling};
        saveAnswer(answ,thislesson._id,thislesson.activequestion);
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
            alert("Please fill in an answer before submitting");
        }


    }
    ,"click #ENDLESSON"(event,tempate){
        Router.go("homeStudentToken");
    }

    });

 saveAnswer = function (answer, lessonid, num) {
    Meteor.call('pushAnswer',{answer:answer,id:lessonid,num:num},(err,res)=> {
        return "save called"
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
    console.log("editting: " + editor);

    editor2 = ace.edit("editor2");
    editor2.setTheme("ace/theme/monokai");
    editor2.getSession().setMode("ace/mode/javascript");
};