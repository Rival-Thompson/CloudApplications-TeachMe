/**
 * Created by hansv on 21/10/2016.
 */
Meteor.methods({
   sendLesson(token){
       //console.log(Lessons.findOne({"token":token}));
       return Lessons.findOne({"token":token});
   },
    pushAnswer(args){

       return  Lessons.update({_id:args.id,'questions.num':args.num},{"$push":{'questions.$.answers':{antw:args.answer}}});
    },getUser(){
        return Meteor.user();
    }
});