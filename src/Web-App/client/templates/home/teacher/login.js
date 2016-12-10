Meteor.subscribe('user');
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

Template.homeTeacherLogin.events({
    'submit .login-form': function (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;

        if (!!email && validateEmail(email)){

            Meteor.loginWithPassword(email,password,function(err){
                if(!err) {
                    sAlert.success("login successful!",{onRouteClose: false});
                    Meteor.subscribe('lessons');
                    Router.go("homeTeacherDashboard");
                }
                else {
                    sAlert.error(err.message);
                    console.log(err.message);
                }
            });

        }else {
            sAlert.warning("Invalid Email! Please enter a valid email to continue.");
        }

    },

    'click .btn-facebook':function(event){
        event.preventDefault();
        Meteor.loginWithFacebook(function(err){
            if(!err) {
                sAlert.success("Facebook login successful!",{onRouteClose: false});
                Meteor.subscribe('lessons');
                Router.go("homeTeacherDashboard");
            }
        });
    },

    'click .btn-google':function(event){
        event.preventDefault();
        Meteor.loginWithGoogle(function(err){
            if(!err) {
                sAlert.success("Google login successful!",{onRouteClose: false});
                Meteor.subscribe('lessons');
                Router.go("homeTeacherDashboard");
            }
        });
    }
});

Template.homeTeacherLogin.onCreated(function () {
    /*if(Meteor.user() != null && Meteor.user() != undefined){
        Meteor.logout();
    }*/
});