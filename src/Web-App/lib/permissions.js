/**
 * Created by Rival on 11/10/2016.
 */
isTeacher = function () {
    console.log("isteacher");
    var loggedInUser = Meteor.user();
    var result = false;
     if(loggedInUser){
         if(loggedInUser.profile.teacher){
             result = true;
         }
     }

     return result;

};