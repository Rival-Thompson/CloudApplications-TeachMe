/**
 * Created by rival on 11/10/2016.
 */
var LetterArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var NumberArray = ["1","2","3","4","5","6","7","8","9","0"];
var tokenRegex = new RegExp("^[A-Z]{1}[0-9]{1}-[A-Z]{1}[0-9]{1}-[A-Z]{1}[0-9]{1}$","i");

function GenerateRandomLetter() {
  var num = Math.round(Math.random()* 25);
    return String(LetterArray[num]).toUpperCase();

}

function GenerateRandomNumber() {
    var num = Math.round(Math.random()* 9);
    return NumberArray[num*1];

}

GenerateToken = function () {
    console.log("gennerating token");
    var token = GenerateRandomLetter()+GenerateRandomNumber()+"-"+GenerateRandomLetter()+GenerateRandomNumber()+"-"+GenerateRandomLetter()+GenerateRandomNumber();
    return token;
};

_makeNewLesson = function (teacher,name,subject,token = null) {

    if(!token){

        token= GenerateToken();
    }else {
        if (!tokenRegex.test(token)){
            alert("Token is invalid! New AutoGnerated Token!");
            token = GenerateToken();
        }

    }
    var tokenInvallid = true;
    while(tokenInvallid){
        if(Lessons.findOne({token: token})){
            token = GenerateToken();
        }
        else {
            tokenInvallid = false;
        }
    }

    var les = {
        teacher: teacher,
        name: name,
        subject: subject,
        token: token,
    };

    Lessons.insert(les,function (err,res) {
        if(err){
            console.log(err.message);
        }else {
            console.log(res.toString());
        }

    })

};

console.log(GenerateToken());

if (tokenRegex.test(GenerateToken())){
    console.log("juiste formaat token!");
}
