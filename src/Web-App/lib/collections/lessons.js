/**
 * Created by Rival on 11/10/2016.
 */

Lessons= new Mongo.Collection("lessons");

Lessons.schema = new SimpleSchema({
    teacher:{type: String, label: "Teacher"},
    name: {type:String, label: "Lesson name"},
    subject: {type:String, label: "Lesson subject"},
    token: {type:String},
    questions:{type:[Object], optional: true}
});

Lessons.allow({
     update : function (userid,lesson) {

         return isTeacher();
     },
    insert : function (userid,lesson) {
         Lessons.schema.validate(lesson);
        if (isTeacher()){
            return true;
        }
        return false;
    },
    remove : function () {
        return isTeacher();
    }

});

if(Meteor.isServer){
    Meteor.methods({

    })
}