import {inject, BindingEngine} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";


@inject(DataRepo, BindingEngine)
export class NewCamp {
	constructor(DataRepo, BindingEngine) {
		this.bindingEngine = BindingEngine;
		this.CampAddress = "";
		this.NumberOfParcelas = "";
		this.CampName = "";
		this.CampDescription = "";
		this.CountryList = [];
		this.SelectedCountry = "";
		this.SelectedCity = "";
		this.dataRepo = DataRepo;
		this.CityList = [];
		this.Subscription = this.bindingEngine
					.propertyObserver(this, "SelectedCountry")
					.subscribe( (newvalue, oldvalue) => {
						this.dataRepo.getCityListForCountry(newvalue).then(list => {
							this.CityList = list;
						});
					});
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

	ResetForm() {
		this.CampAddress = "";
		this.NumberOfParcelas = "";
		this.CampName = "";
		this.CampDescription = "";
		this.SelectedCountry = "";
		this.SelectedCity = "";

	}

	Save() {
		let NewCampObject = {
			Country: this.SelectedCountry,
			City: this.SelectedCity,
			CampName: this.CampName,
			Address: this.CampAddress,
			NoParcela: this.NumberOfParcelas,
			CampDescription: this.CampDescription
		}
	}
	deactivate() {
		this.Subscription.dispose();
	}
}