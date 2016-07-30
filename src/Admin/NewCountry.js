import {DataRepo} from "Common/DataRepo";
import {inject} from "aurelia-framework";

@inject(DataRepo, "Api")
export class NewCountry {
	constructor(dataRepo, api) {
		this.CountryName = "";
		this.repo = dataRepo;
		this.api = api;
		this.Citylist = [];
	}

	activate() {
		return this.repo.getCityListForCountry("Croatia").then(list => { 
			this.Citylist = list; 
		});
	}

	test() {
		let CityListUrl = this.api + "/grad/list/" + this.CountryName;
		console.log(CityListUrl);
	}
}