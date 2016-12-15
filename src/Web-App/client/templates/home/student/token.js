/**
 * Created by rival on 4/10/2016.
 */
Meteor.subscribe('user');
Template.homeStudentToken.events({
    'click .buttonJoin': function (event,template) {
        event.preventDefault();
        var token = template.find('#HS_token').value;
        let regexfull = new RegExp(/^[A-Z]{1}[0-9]{1}-[A-Z]{1}[0-9]{1}-[A-Z]{1}[0-9]{1}$/i);

        if (regexfull.test(template.find('#HS_token').value)){
            //console.log("Token: " + token.toString());
            Router.go('homeStudentLesson',{token:token});
        }else{
            sAlert.warning("Please enter a valid token!");
        }



    },
    'keyup #HS_token':function (event,template) {
        let regex1= new RegExp(/^[A-Z]{1}$/i);
        let regex2 = new RegExp(/^[A-Z]{1}[0-9]{1}$/i);
        let regex3 = new RegExp(/^[A-Z]{1}[0-9]{1}-$/i);
        let regex4 = new RegExp(/^[A-Z]{1}[0-9]{1}-[A-Z]{1}$/i);
        let regex5 = new RegExp(/^[A-Z]{1}[0-9]{1}-[A-Z]{1}[0-9]{1}$/i);
        let regex6 = new RegExp(/^[A-Z]{1}[0-9]{1}-[A-Z]{1}[0-9]{1}-$/i);
        let regex7 = new RegExp(/^[A-Z]{1}[0-9]{1}-[A-Z]{1}[0-9]{1}-[A-Z]{1}$/i);
        let regexfull = new RegExp(/^[A-Z]{1}[0-9]{1}-[A-Z]{1}[0-9]{1}-[A-Z]{1}[0-9]{1}$/i);

        let input = template.find('#HS_token').value;
        switch (input.length){
            case 1:
                if (!regex1.test(template.find('#HS_token').value)){
                    template.find('#HS_token').value = template.find('#HS_token').value.slice(0, -1);
                    console.log('not confirm token');
                }
                break;
            case 2:
                if (!regex2.test(template.find('#HS_token').value)){
                    template.find('#HS_token').value = template.find('#HS_token').value.slice(0, -1);
                    console.log('not confirm token');
                }else template.find('#HS_token').value += "-";

                break;
            case 3:
                if (!regex3.test(template.find('#HS_token').value)){
                    template.find('#HS_token').value = template.find('#HS_token').value.slice(0, -1);
                    console.log('not confirm token');
                }
                break;
            case 4:
                if (!regex4.test(template.find('#HS_token').value)){
                    template.find('#HS_token').value = template.find('#HS_token').value.slice(0, -1);
                    console.log('not confirm token');}
                break;
            case 5:
                if (!regex5.test(template.find('#HS_token').value)){
                    template.find('#HS_token').value = template.find('#HS_token').value.slice(0, -1);
                    console.log('not confirm token');
                }else template.find('#HS_token').value += "-";

                break;
            case 6:
                if (!regex6.test(template.find('#HS_token').value)){
                    template.find('#HS_token').value = template.find('#HS_token').value.slice(0, -1);
                    console.log('not confirm token');
                }

                break;
            case 7:
                if (!regex7.test(template.find('#HS_token').value)){
                    template.find('#HS_token').value = template.find('#HS_token').value.slice(0, -1);
                    console.log('not confirm token');
                }

                break;
            case 8:
                if (!regexfull.test(template.find('#HS_token').value)){
                    template.find('#HS_token').value = template.find('#HS_token').value.slice(0, -1);
                    console.log('not confirm token');
                }

                break;
            default:
                if (!regexfull.test(template.find('#HS_token').value)){
                    template.find('#HS_token').value = template.find('#HS_token').value.slice(0, -1);
                    console.log('not confirm token');
                }
                break;
        }

    }
});