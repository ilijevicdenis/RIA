import {inject, BindingEngine} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";

@inject(BindingEngine, DataRepo)
export class NewParcela {
	constructor(BindingEngine, DataRepo) {
		this.bindEng = BindingEngine;
		this.Repo = DataRepo;
		this.PricePerNight = "";
		this.CampName = "";
		this.Description = "";
		this.ParcelaCode = "";
		this.PricePerNight = "";
		this.weOption = ["Yes", "No"];
		this.ElectricityOption = "";
		this.WaterOption = "";
		this.CountryList = [];
		this.CityList = [];
		this.CampList = [];
		this.SelectedCountry = "";
		this.SelectedCity = "";
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
		/*
			Selected country and city must be set to 
			avoid promise errors.
		*/
		this.PricePerNight = "";
		this.CampName = "";
		this.Description = "";
		this.ParcelaCode = "";
		this.PricePerNight = "";
		this.ElectricityOption = "";
		this.WaterOption = "";
		this.SelectedCountry = "Croatia";
		this.SelectedCity = "Pula";

	}	

	SaveParcela() {
		let NewParcelaObject = [{
			"Country": this.SelectedCountry,
			"City": this.SelectedCity,
			"CampName": this.CampName,
			"ParcelaCode": this.ParcelaCode,
			"Electricity": this.ElectricityOption,
			"Water": this.WaterOption,
			"PricePerNight": this.PricePerNight,
			"Description": this.Description 
		}];
		console.log(JSON.stringify(NewParcelaObject));
	}

	deactivate() {
		this.UpdateCityList.dispose();
		this.UpdateCampList.dispose();
	}
}