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

	getAvailableCampingList() {
		var CampingListPromise = new Promise( (resolve, reject) => {
			let searchListUrl = this.api + "/search";
			this.httpClient.fetch(searchListUrl)
			.then(response => response.json())
			.then(data => resolve(data))
		});

		return CampingListPromise;
	}

	savePicture(PictureObject) {
		let AddNewPictureUrl = this.api + "/picture/add";
		this.httpClient.fetch(AddNewPictureUrl, {
			method: "POST",
			body: JSON(PictureObject)
		});
	}

	saveCity(CityObject) {
		let addNewCityObjectUrl = this.api + "/grad/add";
		this.httpClient.fetch(addNewCityObjectUrl, {
			method: "POST",
			body: JSON(CityObject)
		});
	}

	saveCamp(CampObject) {
			let addNewCampObjectUrl = this.api + "/add"
			this.httpClient.fetch(addNewCampObjectUrl, {
				method: "POST",
				body: JSON(CampObject) 
			});
		}

	saveParcela(ParcelaObject) {
		let addParcelaObjectUrl = this.api + "/parcela/add";
		this.httpClient.fetch(addParcelaObjectUrl, {
			method: "POST",
			body: JSON(ParcelaObject)
		});
	}

	saveUser(UserObject) {
		let addUserUrl = this.api + "/user/register";
		this.httpClient.fetch(addUserUrl, {
			method: "POST",
			body: JSON(UserObject)
		});
	}

	saveParcelaAvailability(ParcelaAvailability) {
		let parcelaAvailabilityUrl = this.api + "/parcela/availability/";
		this.httpClient.fetch(parcelaAvailabilityUrl, {
			method: "POST",
			body: JSON(ParcelaAvailability)
		});
	}
}
