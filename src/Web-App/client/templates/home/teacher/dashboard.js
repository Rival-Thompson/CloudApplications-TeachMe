/**
 * Created by rival on 9/12/2016.
 */

Meteor.subscribe("user");

Template.homeTeacherDashboard.rendered = function () {
    setTimeout(function () {
        //console.log(Meteor.user());
        if(Meteor.user() == null || Meteor.user() == undefined){
            sAlert.warning("Please login first!",{onRouteClose: false});
            Router.go("homeTeacherLogin");
        }
    },500);

};

Template.homeTeacherDashboard.helpers({
    user: function () {
        return Meteor.user();
    }
});
