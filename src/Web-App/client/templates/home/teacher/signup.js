Meteor.subscribe('user');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePass(pasw) {
    var re = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/;
    return re.test(pasw)
}

Template.homeTeacherSignup.events({
    'submit .register-form': function (event) {
        console.log("create user");

        event.preventDefault();


        var email = event.target.email.value;
        var password = event.target.password.value;
        var password2 = event.target.passwordRepeat.value;
        var firstname = event.target.firstName.value;
        var lastname = event.target.lastName.value;
        var school = event.target.school.value;
         if (!!email && validateEmail(email)){
             if(!!password && validatePass(password) ){
                 if(!!password2 && password == password2){
                     if(!!firstname && firstname != ""){
                             if(!!lastname && lastname != ""){
                                 var user = {email: email, password: password, profile: {firstName: firstname, lastName: lastname, school: school,teacher: true}};
                                 //console.log(user);
                                  Accounts.createUser(user, function (err) {
                                  if (!err) {
                                  alert("sign up successful!");
                                  Router.go("homeTeacherLogin")


                                  }else{
                                  console.log(err.message);
                                  }
                                  });
                             }else{
                                 sAlert.warning("Please enter your last name");
                         }
                     }else{
                         sAlert.warning("Please enter your fist name");
                     }
                 }
                 else {
                     sAlert.warning("the two passwords aren't the same please correct this.");
                 }
             }else {
                 sAlert.warning("Password must at least contain: 1 letter & 1 number and have a minimum length of 6.")
             }

         }else {
             sAlert.warning("Invalid Email! Please enter a valid email to continue.");
         }

    }
});