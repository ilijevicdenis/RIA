export class Parcela {
	
	configureRouter(config, router) {
		this.router = router;
		config.title = "Parcela";
		config.map([
			{
				route: ["", "new"],
				moduleId: "Admin/Parcela/NewParcela",
				name: "add",
				title: "New Parcela",
				nav: true
			},
			{
				route: "image",
				moduleId: "Admin/Parcela/ParcelaPicture",
				name: "add_picture",
				title: "New parcela picture",
				nav: true
			},
			{
				route: "availability",
				moduleId: "Admin/Parcela/ParcelaAvailability",
				name: "availability",
				title: "Parcela availability",
				nav: true
			}
		]);
	}
}