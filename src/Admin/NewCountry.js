import {inject} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo"

@inject(DataRepo)
export class NewCountry {
	constructor(dataRepo) {
		this.CountryName = "";
		this.repo = dataRepo;
	}

	Cancel() {
		this.CountryName = "";
	}

	Save() {
		let NewCountry = {CountryName: this.CountryName};
		this.repo.saveCountry(NewCountry);
	}
}