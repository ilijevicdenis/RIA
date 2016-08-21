import {inject} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";

@inject(DataRepo) 
export class NewCity {
	constructor(DataRepo) {
		this.dataRepo = DataRepo;
		this.CountryName = "";
		this.CountryList = [];
		this.CityName = "";
		this.ZipCode = "";
	}

	activate() {
		return this.dataRepo.getCountryList().then(countries => {
			for(let country of countries) {
				this.CountryList.push(country.naziv);
			}
		});
	}

	saveCity() {
		let NewCity = {
			City: this.CityName,
			ZipCode: this.ZipCode, 
			Country: this.CountryName
		}
		this.dataRepo.saveCity(NewCity);
	}

	Cancel() {
		this.CountryName = "";
		this.CityName = "";
	}
}