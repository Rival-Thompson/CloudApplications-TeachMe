
import { Accounts } from 'meteor/accounts-base'

Deps.autorun(function () {
    Meteor.subscribe('user');
    Meteor.subscribe('getUserData');
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        Meteor.loginWithFacebook({requestPermissions:['email', 'public_profile']},function(err){
            if(!err) {
                const fb = Meteor.user().services.facebook;
                //console.log(fb);
                let data = Meteor.user().profile;
                data.teacher = true;
                data.firstName= fb.first_name;
                data.lastName = fb.last_name;
                data.gender = fb.gender;
                Meteor.users.update(Meteor.userId(), {$set: {profile: data}});
                if(Meteor.user().emails == undefined || Meteor.user().emails.length <= 0){
                    Meteor.call("addEmailFromSocial",fb.email);
                }
                sAlert.success("Facebook login successful!",{onRouteClose: false});
                Meteor.subscribe('lessons');
                Router.go("homeTeacherDashboard");
            }
        });
    },

    'click .btn-google':function(event){
        event.preventDefault();
        Meteor.loginWithGoogle({requestPermissions:['email', 'profile']},function(err){
            if(!err) {

                const go = Meteor.user().services.google;
                //console.log(go);
                let data = Meteor.user().profile;
                data.teacher = true;
                data.firstName= go.given_name;
                data.lastName = go.family_name;
                data.gender = go.gender;
                Meteor.users.update(Meteor.userId(), {$set: {profile: data}});
                if(Meteor.user().emails == undefined || Meteor.user().emails.length <= 0){
                    Meteor.call("addEmailFromSocial",go.email);
                }

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