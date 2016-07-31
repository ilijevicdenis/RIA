import {inject, BindingEngine} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";

@inject(DataRepo, BindingEngine)
export class Reservation {
	constructor(DataRepo, BindingEngine) {
		this.dataRepo = DataRepo;
		this.bindEngine = BindingEngine;
		this.ReservationEmail = "";
		this.ReservationDate = "";
		this.ArrivalDate = "";
		this.DepartureDate = "";
		this.ParcelaCode = "";
		this.CountryName = "";
		this.CountryList = [];
		this.CityList  = [];
		this.CampList = [];
		this.SelectedCity = null;
		this.SelectedCountry = null;
		this.SelectedCamp = null;
		
		this.CitySub = this.bindEngine.propertyObserver(this, "SelectedCountry").
						subscribe( (newvalue) => {
							this.dataRepo.getCityListForCountry(newvalue).then(list => this.CityList = list);
						});
		
		this.CampSub = this.bindEngine.propertyObserver(this, "SelectedCity").subscribe( (newvalue) => {
							this.dataRepo.getCampList(this.SelectedCountry, newvalue).then(list => {
								this.CampList = list;
							})
						});
	}

	activate() {
		return Promise.all([
			this.dataRepo.getCountryList().then(list => {
				for(let country of list) {
					this.CountryList.push(country.naziv);
				}
			}),
		]);
	}

	deactivate() {
		this.CitySub.dispose();
		this.CampSub.dispose();
	}
}