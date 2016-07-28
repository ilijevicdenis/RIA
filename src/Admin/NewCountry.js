import {DataRepo} from "Common/DataRepo";
import {inject} from "aurelia-framework";

@inject(DataRepo)
export class NewCountry {
	constructor(dataRepo) {
		this.CountryName = "";
		this.repo = dataRepo;
	}

	activate() {
		return this.repo.getCountryList().then(CountryList => {
			this.list = CountryList;
		});
	}
}