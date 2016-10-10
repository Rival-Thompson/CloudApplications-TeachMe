Template.homeTeacherLogin.events({
    'submit .login-form': function (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email,password,function(err){
            if(!err) {
                alert("login successful!");
                //Router.go('/');
            }
        });
    },

    'click .btn-facebook':function(event){
        event.preventDefault();
        Meteor.loginWithFacebook(function(err){
            if(!err) {
                alert("Facebook successful!");
                //Router.go('/');
            }
        });
    },

    'click .btn-google':function(event){
        event.preventDefault();
        Meteor.loginWithGoogle(function(err){
            if(!err) {
                alert("Google successful!");
                //Router.go('/');
            }
        });
    }
});