/*
	Main class for front end navigation. 
	Configures routes for admin and regulur users
	Author: Denis Ilijevic
*/

export class Shell {

	constructor() {

	}

	configureRouter(config, router) {
		this.router = router;
		config.title = "RIA rentals Inc.";
		//config.options.pushState = true;
		config.map([
			{
				route: ["", "aboutus"],
				moduleId: "static/AboutUs",
				nav: false
			},
			{
				route: "search",
				moduleId: "Search/Search",
				title: "Search",
				name: "search",
				nav: true
			},
			{
				route: "booking",
				moduleId: "Booking/Booking",
				name: "booking",
				title: "Booking",
				nav: true
			},
			{
				route: "admin",
				moduleId: "Admin/admin",
				name: "admin",
				title: "Admin",
				nav: true
			},
						{	
				route:  "register", 
				moduleId: "UserRegistration/UserRegistration", 
				name: "User registration", 
				title: "User Registration", 
				nav: true
			},
			{
				route: "login",
				moduleId: "Login/UserLogin",
				name: "User login",
				title: "User login",
				nav: true
			}
		]);
	}
}