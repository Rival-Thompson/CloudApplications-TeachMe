/**
 * Created by Rival on 25/10/2016.
 */
Meteor.subscribe('user');

Template.registerHelper('zelfde', (a, b)=> {
    return a == b;
});

Template.homeStudentLesson.helpers({

});

Template.homeStudentLesson.events({}

);

 saveAnswer = function (answer, lessonid, num) {
    Meteor.call('pushAnswer',{answer:answer,id:lessonid,num:num},(err,res)=> {
        return "save called"
    })
};

Template.homeStudentLesson.rendered = function () {
    var token = Router.current().params.token;
    console.log("the awesome token is: " + token);
        Meteor.subscribe('studentLesson',token);
};