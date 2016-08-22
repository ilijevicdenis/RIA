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
		this.ParcelaIds = [],
		this.ParcelaId = "";
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
								if(this.CampList.length == 0)
									this.ParcelaIds = [];
							})
						});

		this.ParId = this.bindEngine.propertyObserver(this, "SelectedCamp")
			.subscribe( newvalue => {
				this.dataRepo.getIds(this.SelectedCountry, this.SelectedCity, newvalue)
				.then(list => {
					if(this.CampList.length == 0) {
						this.ParcelaIds = [];
					} else if(this.CampList.length > 0) {
						this.ParcelaIds = [];
						this.ParcelaId = "";
						for(let item of list) {
							if(item.parcelaId != "") 
								this.ParcelaIds.push(item.parcelaId);
						}
					} 
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

	Save() {
		let NewReservationObject = {
			email: this.ReservationEmail,
			ardate: this.ArrivalDate,
			dpdate: this.DepartureDate,
			parcelaId: this.ParcelaId,
			availability: "Occupied",
			desc: "User reservation"
		}

		console.log(JSON.stringify(NewReservationObject));
		this.dataRepo.saveReservation(NewReservationObject);
	}

	deactivate() {
		this.CitySub.dispose();
		this.CampSub.dispose();
		this.ParId.dispose();
	}
}