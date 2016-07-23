export class Admin {
	configureRouter(config, router) {
		this.router = router;
		config.title = "Admin";
		config.map([
			{
				route: ["", "newcamp"],
				moduleId: "Admin/NewCamp",
				name: "New camp",
				title: "Add camp",
				nav: true
			},
			{
				route: "newcity",
				moduleId: "Admin/NewCity",
				name: "New city",
				title: "Add city",
				nav: true
			},
			{
				route: "newcountry",
				moduleId: "Admin/newcountry",
				name: "New country",
				title: "Add country",
				nav: true
			}
		]);
	}
}