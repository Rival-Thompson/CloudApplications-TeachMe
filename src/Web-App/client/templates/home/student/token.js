/**
 * Created by rival on 4/10/2016.
 */
Template.homeStudentToken.events({
    'submit .studentTokenForm': function (event) {
        event.preventDefault();
        console.log(event);
        var token = event.target.studentInputToken.value;

        console.log("Token: " + token.toString());
    }
});