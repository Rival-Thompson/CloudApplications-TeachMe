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