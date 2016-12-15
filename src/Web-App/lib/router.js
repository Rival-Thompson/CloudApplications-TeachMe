/**
 * Created by rival on 2/10/2016.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pagenotfound'
});

Router.route("/", {
    name: "homeIndex"
});
Router.route("/teacher/login", {
    name: "homeTeacherLogin"
});
Router.route("/teacher/signup", {
    name: "homeTeacherSignup"
});
Router.route("/teacher/dashboard", {
    name: "homeTeacherDashboard"
});
Router.route("/teacher/lesson/:token", {
    name: "homeTeacherHub"
});
Router.route("/lesson/token/:token", {
    name: "ShowToken",
    data: function () {
        return {token : this.params.token}
    }
});

Router.route("/student/token", {
    name: "homeStudentToken"
});
Router.route("/teacher/lesson/:token/:activeNum", {
    name: "homeTeacherHubActiveQuestion"
});
Router.route("/student/lesson/:token", {
    name: "homeStudentLesson"
});