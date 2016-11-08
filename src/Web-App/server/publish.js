/**
 * Created by Rival on 8/11/2016.
 */
Meteor.publish('studentLesson',function (lesson) {
    return Lessons.find({token:lesson});

});
Meteor.publish('lessons',function () {
return Lessons.find({teacher:this.userId});

});

Meteor.publish('user',function () {
    return this.user;
});
