/**
 * Created by rival on 18/10/2016.
 */

Template.registerHelper('zelfde',(a,b)=>{
   return a == b;
});

var temp = {
        _id:911
        , Teacher:5588958
        ,Name:"TestLesson"
        ,Subject:"world greatest lesson"
        ,Token:"A1-A1-A1"
        ,Questions:[{
            type:"Open",
            question:"How is it going?"
            ,num:1
        },{
            type:"MultipleChoice",
            question:"How is it going?"
        ,num:2
        },{
            type:"Open",
            question:"How is it going?"
        ,num:3
        }]
    };
var tempDep = new Tracker.Dependency();
var selected = temp.Questions[0];
var selectedDep = new Tracker.Dependency();


Template.homeTeacherHub.helpers({
    thislesson: function () {
        tempDep.depend();
        return temp
    }
    ,selectedQuestion: function () {
        selectedDep.depend();
        return selected
    }

});

Template.homeTeacherHub.events({
   'click #HTH_AddQuestion'(event){
       temp.Questions.push({type:"Open",question:"new question",num:temp.Questions.length+1});
       tempDep.changed();
       console.log("added question");
   },
    'click #HTH_SaveQuest'(event,template){
       console.log(event);
        selected.question = template.find('#HTH_InputQuestion').value;
        selected.type = template.find('#HTH_SelectType').value;
        selectedDep.changed();
    },
    'click .HTH_SelectQuest'(event){
        console.log(event);
        console.log(event.currentTarget.innerText);
        var result = $.grep(temp.Questions, function(e){ return e.num == event.currentTarget.innerText; });
        console.log(result);
        selected = result[0];
        selectedDep.changed();
    }
});