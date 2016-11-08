/**
 * Created by Rival on 11/10/2016.
 */
isTeacher = function (user) {
    console.log("isteacher");
    var loggedInUser = Meteor.call("getUser");
    //console.log(loggedInUser);
    var result = false;
     if(loggedInUser){
         if(loggedInUser.profile.teacher){
             result = true;
         }
     }

     return result;

};