var lesson = this.data;

Template.homeTeacherHub.events({
    "click #HTH_AddQuestion"(event){
        event.preventDefault();

        console.log(Router.current().params.token);
        console.log(lesson);
    }
});

Template.homeTeacherHub.helpers({
    thislesson: lesson
});