Template.homeTeacherSignup.events({
    'submit .register-form': function (event) {
        console.log("create user");

        event.preventDefault();


        var email = event.target.email.value;
        var password = event.target.password.value;
        var firstname = event.target.firstName.value;
        var lastname = event.target.lastName.value;
        var school = event.target.school.value;

        var user = {email: email, password: password, profile: {firstName: firstname, lastName: lastname, school: school}};

        Accounts.createUser(user, function (err) {
            if (!err) {
                alert("sign up successful!");
                Router.go("homeTeacherLogin");

            }else{
                console.log(err.message);
            }
        });
    }
});