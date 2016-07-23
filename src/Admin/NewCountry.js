import {DataRepo} from "Common/DataRepo";
import {inject} from "aurelia-framework";

@inject(DataRepo)
export class NewCountry {
	constructor(dataRepo) {
		this.CountryName = "";
		this.dataRepo = dataRepo;
	}

	Test() {
		this.dataRepo.getCountryList();
	}
}