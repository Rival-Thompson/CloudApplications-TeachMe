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
    getActiveQuestion(token){
        //console.log(token);
        let activequestions = Lessons.findOne({'token':token,'questions.num':Lessons.findOne({'token':token}).activequestion},{fields:{'questions.$':1}});
        //console.log(activequestions.questions[0]);
        return activequestions.questions[0];
    },
    getQuestion(params){
        console.log(params.token);
        let activequestions = Lessons.findOne({'token':params.token,'questions.num':params.num},{fields:{'questions.$':1}});
        //console.log(activequestions.questions[0]);
        return activequestions.questions[0];
    },
    sendActiveQuestion(token){
        //console.log(Lessons.findOne({"token": token}).activequestion);
        const tempNum = Lessons.findOne({"token": token}).activequestion;

       // console.log(Lessons.findOne({"token": token, "questions.num": tempNum}, {fields: {"questions.$": 1}}));
        return Lessons.findOne({"token": token, "questions.num": tempNum}, {fields: {"questions.$": 1}}).questions[0];
    },
    removeAnswers(param){
        return Lessons.update({_id: param._id, "questions.num": param.num}, {$unset: {"questions.$.answers": 1}});
    },
    deleteLesson(param) {
        return Lessons.remove({token: param.token});
    },
    addEmailFromSocial(email){
        Accounts.addEmail(Meteor.userId(),email,true);
        console.log("adding social email: " +email+ " to: " +Meteor.userId() );
    }
});


