import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
 
@inject(HttpClient, 'Api')
export class DataRepo {

	constructor(httpClient, api) {

		httpClient.configure(config => {
			config.useStandardConfiguration()
		});

		this.httpClient = httpClient;
		this.api = api;
	}

	getCountryList() {
		var CountryListPromise = new Promise( (resolve, reject) => {
		 	this.httpClient.fetch(this.api + "/drzava")
			.then(response => response.json())
			.then(data => resolve(data));
		});
		return CountryListPromise;
	}

	getBookingList() {
		var BookingListPromise = new Promise ( (resolve, reject) => {
			this.httpClient.fetch(this.api + "/booking/list")
				.then(response => response.json())
				.then(data => resolve(data));
 		});
 		return BookingListPromise;
	}

	getCityListForCountry(CountryName) {
		var CiyListPromise = new Promise( (resolve, reject) => {
			let CityListUrl = this.api + "/grad/list/"  + CountryName;
			this.httpClient.fetch(CityListUrl)
				.then(response => response.json())
				.then(data => {
					var CityList = [];
					for(let item of data) {
						CityList.push(item.grad_ime);
					}
					resolve(CityList);
				});
			});
		return CiyListPromise;
	}

	getCampList(Country, City) {
		var CampListPromise = new Promise( (resolve, reject) => {
			let CampListUrl = this.api + "/search/camps/" + Country + "/" + City;
			this.httpClient.fetch(CampListUrl)
				.then(response => response.json())
				.then(data => {
					var CampList = [];
					for (let camp of data) {
						CampList.push(camp.kamp_ime);
					}
					resolve(CampList)
				});
		});
		return CampListPromise;
	}

	saveCountry(CountryObject) {
		let AddNewCountryUrl = this.api + "/drzava/add/";
		this.httpClient.fetch(AddNewCountryUrl, {
			method: "POST",
			body: json(CountryObject) 
		});
	}
}