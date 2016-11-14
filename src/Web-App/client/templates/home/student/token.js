/**
 * Created by rival on 4/10/2016.
 */
Meteor.subscribe('user');
Template.homeStudentToken.events({
    'click .buttonJoin': function (event,template) {
        event.preventDefault();
        console.log(event);
        var token = template.find('#HS_token').value;

        console.log("Token: " + token.toString());
        Router.go('homeStudentLesson',{token:token});
    }
});