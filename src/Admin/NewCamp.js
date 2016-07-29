import {inject} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";


@inject(DataRepo)
export class NewCamp {
	constructor(DataRepo) {
		this.CampAddress = "";
		this.NumberOfParcelas = "";
		this.CampName = "";
		this.CampDescription = "";
		this.CountryList = [];
		this.SelectedCountry = "";
		this.dataRepo = DataRepo;
	}

	activate() {
		return Promise.all([
			this.dataRepo.getCountryList().then(Countries => {
				for(let country of Countries) {
					this.CountryList.push(country.naziv);
				}
			})
		]);
	}
}