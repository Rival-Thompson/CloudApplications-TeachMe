/**
 * Created by hansv on 21/10/2016.
 */
Meteor.methods({
   sendLesson(token){
       console.log(Lessons.findOne({"token":token}));
       return Lessons.findOne({"token":token});
   }
});