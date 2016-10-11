/**
 * Created by rival on 11/10/2016.
 */
import { Mongo } from 'meteor/mongo'

var Lessons= new Mongo.Collection("lessons");
var LetterArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var NumberArray = ["1","2","3","4","5","6","7","8","9","0"];

Lessons.schema = new SimpleSchema({
    teacher:{type: String, label: "Teacher"},
    name: {type:String, label: "Lesson name"},
    subject: {type:String, label: "Lesson subject"},
    token: {type:String},
    questions:{type:[Object], optional: true}
});

var CreateLesson = new function (teacher,name,subject) {

};

var GenerateToken = function () {
 var token = GenerateRandomLetter()+GenerateRandomNumber()+"-"+GenerateRandomLetter()+GenerateRandomNumber()+"-"+GenerateRandomLetter()+GenerateRandomNumber();
return token;
};

function GenerateRandomLetter() {
  var num = Math.round(Math.random()* 25);
    return String(LetterArray[num]).toUpperCase();

}

function GenerateRandomNumber() {
    var num = Math.round(Math.random()* 9);
    return NumberArray[num*1];

}

console.log(GenerateToken());
