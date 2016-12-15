Meteor.subscribe('user');

Template.homeTeacherOverviewLesson.helpers({
    thisLessons: function () {
        //console.log(Lessons.find({teacher: Meteor.userId()}));
        return Lessons.find({teacher: Meteor.userId()});
    }
});

Template.homeTeacherOverviewLesson.events({

});

Template.homeTeacherOverviewLesson.rendered = function () {

};