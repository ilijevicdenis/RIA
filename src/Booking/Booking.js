
export class Booking {
	configureRouter(config, router) {
		this.router = router;
		config.title = "Booking";
		config.map([
			{
				route: ['',"New reservation"],
				moduleId: "Booking/reservation",
				name: "reservation",
				title: "New reservation",
				nav: true
			},
			{
				route: "list",
				moduleId: "Booking/BookingList",
				name: "Booking list",
				title: "Booking list",
				//auth: true,
				nav: true
			}		
		]);
	}
}