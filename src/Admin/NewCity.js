import {inject} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";

@inject(DataRepo) 
export class NewCity {
	constructor(DataRepo) {
		this.dataRepo = DataRepo;
		this.CountryName = "";
		this.CountryList = [];
		this.CityName = "";
	}

	activate() {
		return this.dataRepo.getCountryList().then(countries => {
			for(let country of countries) {
				this.CountryList.push(country.naziv);
			}
		});
	}

	saveCity() {
		let NewCity = [{CityName: this.CityName, Country: this.CountryName}];
		console.log(JSON.stringify(NewCity));
	}

	Cancel() {
		this.CountryName = "";
		this.CityName = "";
	}
}