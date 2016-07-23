export class Parcela {
	
	configureRouter(config, router) {
		this.router = router;
		config.title = "Parcela";
		config.map([
			{
				route: [""],
				moduleId: "Parcela/NewParcela",
				name: "add",
				title: "New Parcela",
				nav: true
			},
			{
				route: "image",
				moduleId: "Parcela/ParcelaPicture",
				name: "new picture",
				title: "New parcela picture",
				nav: true
			}
		]);
	}
}