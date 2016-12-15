/**
 * Created by rival on 10/12/2016.
 */
Template.navTeacherDash.events({
    'click #btnProfile': function (event) {
        event.preventDefault();
       Meteor.logout(function () {
           sAlert.info("logout successful",{onRouteClose: false});
           Router.go("homeTeacherLogin");
       })

    }
});
let wasDev = false;
const wasDevDep = new Tracker.Dependency;
Template.navTeacherDash.helpers({
    developper: function () {
        wasDevDep.depend();
        return wasDev;

    }
});

Template.navTeacherDash.rendered = function () {
    console.log(Meteor.user());

    if(Meteor.user().emails[0].address == "development@tma.be"){
        wasDev = true;
        console.log("USER IS DEVELOPER");
        wasDevDep.changed();

    }
};