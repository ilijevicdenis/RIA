/*
	Main class for front end navigation. 
	Configures routes for admin and reguluras users
	Author: Denis Ilijevic
*/

export class Shell {

	constructor() {

	}

	configureRouter(config, router) {
		this.router = router;
		config.title = "RIA rentals Inc."
		config.map([
			{
				route: "",
				moduleId: "static/AboutUs",
				nav: false
			},
			{	
				route:  "register", 
				moduleId: "UserRegistration/UserRegistration", 
				name: "User registration", 
				title: "User Registration", 
				nav: true
			},
			{
				route: "parcela",
				moduleId: "Parcela/Parcela",
				name: "parcela",
				title: "Parcela",
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
			}
		]);
	}
}