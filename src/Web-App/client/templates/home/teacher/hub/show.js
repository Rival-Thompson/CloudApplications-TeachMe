var lesson = null;


Template.homeTeacherHub.events({
    "click #HTH_AddQuestion"(event){
        event.preventDefault();
        //var lesson = Lessons.findOne({token: Router.current().params.token});

        console.log(Router.current().params.token);
        console.log(lesson);
    }
});

Template.homeTeacherHub.helpers({
    thislesson: lesson
});

Template.homeTeacherHub.rendered = function () {
    var token = Router.current().params.token;
    console.log(token);
    Meteor.call("sendLesson",token,(error,response)=>{
        if(error){
            console.log(error);
        }else{
            console.log("Response: " + JSON.stringify(response));
            lesson = response;
        }
    });
};

/*
Template.registerHelper('zelfde', (a, b)=> {
    return a == b;
});

var temp = {
    _id: 911
    , Teacher: 5588958
    , Name: "TestLesson"
    , Subject: "world greatest lesson"
    , Token: "A1-A1-A1"
    , Questions: [{
        type: "Open",
        question: "How is it going?"
        , num: 1
    }, {
        type: "MultipleChoice",
        question: "How is it going?"
        , num: 2
    }, {
        type: "Open",
        question: "How is it going?"
        , num: 3
    }]
};

var tempDep = new Tracker.Dependency();
var selected = temp.Questions[0];
var selectedDep = new Tracker.Dependency();


Template.homeTeacherHub.events({
    'click #HTH_AddQuestion'(event){
        temp.Questions.push({type: "Open", question: "new question", num: temp.Questions.length + 1});
        tempDep.changed();
        console.log("added question");
    },
    'click #HTH_SaveQuest'(event, template){
        console.log(event);
        selected.question = template.find('#HTH_InputQuestion').value;
        selected.type = template.find('#HTH_SelectType').value;
        selectedDep.changed();
    },
    'click .HTH_SelectQuest'(event){
        console.log(event);
        console.log(event.currentTarget.innerText);
        var result = $.grep(temp.Questions, function (e) {
            return e.num == event.currentTarget.innerText;
        });
        console.log(result);
        selected = result[0];
        selectedDep.changed();
    }
});
*/