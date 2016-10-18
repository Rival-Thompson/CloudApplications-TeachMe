/**
 * Created by rival on 2/10/2016.
 */
Router.configure({
    layoutTemplate:'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pagenotfound'
});

Router.route("/",{
   name : "homeIndex"
});
Router.route("/teacher/login",{
    name : "homeTeacherLogin"
});
Router.route("/teacher/signup",{
    name : "homeTeacherSignup"
});
Router.route("/teacher/dashboard",{
    name : "homeTeacherDashboard"
});
Router.route("/teacher/lesson/:token",function () {
   var thisLesson = Lessons.findOne({token: this.params.token});
    this.render('homeTeacherHub',{data: thisLesson})
});


Router.route("/student/token",{
    name : "homeStudentToken"
});
