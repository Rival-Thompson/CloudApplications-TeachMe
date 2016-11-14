/**
 * Created by hansv on 21/10/2016.
 */
Meteor.methods({
    sendLesson(token){
        console.log(Lessons.findOne({"token":token}));
        return Lessons.findOne({"token":token});
    },
    sendActiveQuestion(token){
        console.log(Lessons.findOne({"token":token}).activequestion);
        var tempNum = Lessons.findOne({"token":token}).activequestion;

        console.log(Lessons.findOne({"token":token,"questions.num":tempNum},{fields:{"questions.$":1}}));
        return Lessons.findOne({"token":token,"questions.num":tempNum},{fields:{"questions.$":1}});
    }
});