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

Router.route("/student/token",{
    name : "homeStudentToken"
});
