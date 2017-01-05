# Teach Me
## What is Teach Me
Teach me is an online collaboration platform for student and teachers to make lessons more interactive & fun.

This platform is developed in [meteor](https://www.meteor.com/ "meteor"). We used several packages to achieve our goal in this project.

*This application is an school project and isn't seen as a finished state. Forking is allowed and if you find issues you are welcome to report them to us.*

## Getting started
To run this on an local machine you have to have [meteor](https://www.meteor.com/ "meteor") and [node js](https://nodejs.org/en/ "nodejs") installed. Navigate with your terminal to [src/Web-App](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App). Then run `npm install` & `meteor npm install` in this folder. After this you run `meteor` in the same terminal window and you should be up and running. To deploy it to an external server we recommend you to take a look at [Meteor-Up](https://github.com/kadirahq/meteor-up). There is an example [meteor-up deploy script](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/mup.js) in the [src/Web-App](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App) folder.

To configure the Google & Facebook login features create a teacher with the email set to `development@tma.be`. After logging in with this user you will see an extra element in the navbar with development@tma.be styled as a link. If you press this and then select `sign out` you should be able to configure Facebook & Google in that same pop up.

## Features of the app
- Index page with links to student & teacher sides of the app
- Student Side
	- Join a lesson with a given token
	- Answer the questions once
		- Open questions
		- Multiple choice questions
		- Code questions (Mainly JavaScript with integrated syntax highlighting)
	- Rate The question
	- Leave the lesson
- Teacher side
	- Sign up (Email & Password)
	- Login as a teacher
		- Email & Password
		- Facebook
		- Google
	- Teacher Dashboard
 		- Start a new lesson
 		- Reuse an old lesson
 	- Lesson hub
	 	-  Add new questions
	 	-  Change question types
		 	-  Open
		 	-  Multiple Choice
		 	-  Code
		-  Ask a question
		-  Remove a question
		-  Edit a question
		-  Remove previously given answers
		-  End the lesson
	-  Show question answer when asking a question
		-  Multiple choice (Pie chart)
		-  Open (Word cloud)
		-  Code (Carousel with syntax highlighted answers)
		-  Show the question
		-  Show the average rating
		-  End Lesson
	- Show the token of the active lesson
	- End lesson (popup)
		- Save lesson (lesson will be saved and reusable in dashboard)
		- delete lesson (lesson won't be saved)

## Project Layout
- [Documentation and research]()
- [Source code](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App)
	- [Stylesheets](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets)
	- [Templates](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates)
	- [Permissions, routing & collections](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/lib)
	- [Images](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/public)
	- [Meteor methods & pub-sub files](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/server)
	- [Meteor-up deploy script](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/mup.js)

## External Meteor packages

- [d3js:d3](https://atmospherejs.com/d3js/d3)
- [emdagon:c3js](https://atmospherejs.com/emdagon/c3js)
- [iron:router](https://atmospherejs.com/iron/router)
- [fortawesome:fontawesome](https://atmospherejs.com/fortawesome/fontawesome)
- [fourseven:scss](https://atmospherejs.com/fourseven/scss)
- [juliancwirko:s-alert](https://atmospherejs.com/juliancwirko/s-alert)
- [overture8:wordcloud2](https://atmospherejs.com/overture8/wordcloud2)
- [simple:reactive-method](https://atmospherejs.com/simple/reactive-method)
- [twbs:bootstrap](https://atmospherejs.com/twbs/bootstrap)
- [jackyqiu:meteor-jquery-nicescroll](https://atmospherejs.com/jackyqiu/meteor-jquery-nicescroll)