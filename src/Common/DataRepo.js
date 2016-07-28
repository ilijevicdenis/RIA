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
		var CountListPromise = new Promise( (resolve, reject) => {
		 	this.httpClient.fetch(this.api + "/drzava")
			.then(response => response.json())
			.then(data => resolve(data));
		});
		return CountListPromise;
	}
}