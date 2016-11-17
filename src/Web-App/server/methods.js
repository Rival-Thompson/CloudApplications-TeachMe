/**
 * Created by hansv on 21/10/2016.
 */
Meteor.methods({
   sendLesson(token){
       //console.log(Lessons.findOne({"token":token}));
       return Lessons.findOne({"token":token});
   },
    pushAnswer(args){

       return  Lessons.update({_id:args.id,'questions.num':args.num},{"$push":{'questions.$.answers':args.answer}});
    },getUser(){
        return Meteor.user();
    },
    qetActiveQuestion(token){
        console.log(token);
        var activequestions = Lessons.findOne({'token':token,'questions.num':Lessons.findOne({'token':token}).activequestion},{fields:{'questions.$':1}});
        console.log(activequestions.questions[0]);
       return activequestions.questions[0];
    },
    getQuestion(params){
        console.log(params.token);
        var activequestions = Lessons.findOne({'token':params.token,'questions.num':params.num},{fields:{'questions.$':1}});
        console.log(activequestions.questions[0]);
        return activequestions.questions[0];
    }
});