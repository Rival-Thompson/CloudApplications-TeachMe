Meteor.subscribe('user');
Template.homeTeacherLogin.events({
    'submit .login-form': function (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email,password,function(err){
            if(!err) {
                alert("login successful!");
                Meteor.subscribe('lessons');
                Router.go("homeTeacherDashboard");
            }
            else {
                console.log(err.message);
            }
        });
    },

    'click .btn-facebook':function(event){
        event.preventDefault();
        Meteor.loginWithFacebook(function(err){
            if(!err) {
                alert("Facebook successful!");
                Meteor.subscribe('lessons');
                Router.go("homeTeacherDashboard");
            }
        });
    },

    'click .btn-google':function(event){
        event.preventDefault();
        Meteor.loginWithGoogle(function(err){
            if(!err) {
                alert("Google successful!");
                Meteor.subscribe('lessons');
                Router.go("homeTeacherDashboard");
            }
        });
    }
});