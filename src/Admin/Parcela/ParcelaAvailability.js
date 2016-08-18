import {inject, BindingEngine} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";

@inject(BindingEngine, DataRepo)
export class NewParcela {
	constructor(BindingEngine, DataRepo) {
		this.bindEng = BindingEngine;
		this.Repo = DataRepo;
		this.AvailabilityDescription = "";
		this.AvailableFrom = "";
		this.AvailableUntil = "";
		this.ParcelaCode = "";
		this.AvailabilityStatus = ["Free", "Occupied", "Special purposes"];
		this.SelectedAvailabilityStatus = "";
		this.CountryList = [];
		this.CityList = [];
		this.CampList = [];
		this.SelectedCountry = "";
		this.SelectedCity = "";
		this.SelectedCamp = "";
		this.ParcelaCode = ""

		this.UpdateCityList = this.bindEng.propertyObserver(this, "SelectedCountry")
								  .subscribe( newvalue => {
								  	this.Repo.getCityListForCountry(newvalue).then(list => {
								  		this.CityList = list;
								  	})
								  });
		
		this.UpdateCampList = this.bindEng.propertyObserver(this, "SelectedCity")
									.subscribe(newvalue => {
										this.Repo.getCampList(this.SelectedCountry, newvalue).then(list => {
											this.CampList = list;
										})
									});
	}

	activate() {
		return this.Repo.getCountryList().then(list => {
			for (let item of list) {
				this.CountryList.push(item.naziv);
			}
		});
	}

	ResetForm() {
		this.AvailabilityDescription = "";
		this.AvailableFrom = "";
		this.AvailableUntil = "";
		this.ParcelaCode = "";
		this.SelectedAvailabilityStatus = "";
		this.SelectedCountry = "Croatia";
		this.SelectedCity = "Pula";
		this.ParcelaCode = ""
		this.SelectedCamp = "";

	}

	Save() {
		let ParcelaAvailabilityObject = {
			Country: this.SelectedCountry,
			City: this.SelectedCity,
			Camp: this.SelectedCamp,
			ParcelaCode: this.ParcelaCode,
			AvailableFrom: this.AvailableFrom,
			AvailableUntil: this.AvailableUntil,
			AvailabilityStatus: this.AvailabilityStatus,
			AvailabilityDescription: this.AvailabilityDescription,
		};
		this.Repo.saveParcelaAvailability(ParcelaAvailabilityObject);
	}


	deactivate() {
		this.UpdateCityList.dispose();
		this.UpdateCampList.dispose();
	}
}