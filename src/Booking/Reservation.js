import {inject} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";

@inject(DataRepo)
export class Reservation {
	constructor(DataRepo) {
		this.dataRepo = DataRepo;
		this.ReservationEmail = "";
		this.ReservationDate = "";
		this.ArrivalDate = "";
		this.DepartureDate = "";
		this.ParcelaCode = "";
		this.CountryName = "";
		this.CountryList = [];
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
}