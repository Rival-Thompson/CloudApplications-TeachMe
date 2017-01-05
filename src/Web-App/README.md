#Source Code

##[Client](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client)
In this folder you can find all the client only files. The HTML, JavaScript & CSS that basically makes the web page.

###[Configs](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/configs)
-[sAlert](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/configs/sAlert-config.js) : this is the config file for the external package sAlert

###[Stylesheets](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets)

- [Custom Bootstrap](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets/Custom-Bootstrap)
	- [Customization NavBars](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets/Custom-Bootstrap/navbar)
	- [Customization Buttons](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets/Custom-Bootstrap/buttons.css)
- [Student Styling](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets/student)
	- [Answer pages](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets/student/Lesson.scss)
	- [Rating stars under the given answer](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets/student/Rating.scss)
	- [Token page](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets/student/token.scss)
- [Teacher Styling](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/stylesheets/Teacher)
	- [Active Question](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/Teacher/activeQuesstion.scss)
	- [Create Lesson Partial](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/Teacher/createLesson.scss) 
	- [Teacher Dashboard](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/Teacher/dashboard.scss) 
	- [Teacher Lesson Hub](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/Teacher/hub.scss)
	- [Teacher Login](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/Teacher/login.css)
	- [Teacher Pop-Up At end of lesson](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/Teacher/popupEndLesson.scss)
	- [Teacher Signup](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/Teacher/signup.css)
	- [Teacher Show Token Page](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/Teacher/ShowToken.scss)
	- [Teacher Overview of lessons](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/Teacher/teacherOverviewLesson.scss)
- [Main Web-App styling](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets)
	- [404 page](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/404.css)
	- [Sass file for the main colors used in the app](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/_colors.scss)
	- [Common App styling](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/app.css)
	- [Loading page](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/stylesheets/loading.css)

###[Templates](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates)

- [Partials](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates/_partials)
	- [Navbars](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates/_partials/nav) 
	- [Pop-Up Teacher ending lesson](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/templates/_partials/popupEndLesson.html)
- [Common App pages](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates/app)
	- 404 page
	- WabApp Layout Template
	- Loading page
- [Teacher pages](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates/home/teacher)
	- [Teacher Lesson Hub](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates/home/teacher/hub)
		-  Question partials
		-  The Hub it self (Show)
		-  Active Question page
	- Show Token of this Lesson Page
	- Create Lesson partial
	- Lessons dashboard
	- Login page
	- Lessons Overview partial
	- Sign up page
- [Student pages](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates/home/student)
	- [The active lesson page](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates/home/student/lesson)
		- The page it self (show)
		- Rating partial
		- [Question partials](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/client/templates/home/student/lesson/questions)
	- Enter token page
- [Index page](https://github.com/Rival-Thompson/CloudApplications-TeachMe/blob/master/src/Web-App/client/templates/home/index.html)

##[Lib](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/lib)
- Router (Configuration iron:router)
- permissions
- Collections
	- Lessons

##[Public](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/public)
- Images
- External scripts

##[Server](https://github.com/Rival-Thompson/CloudApplications-TeachMe/tree/master/src/Web-App/server)
- Meteor Methods file
- Meteor Publish file