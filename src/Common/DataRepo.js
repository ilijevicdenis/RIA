import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";

@inject(HttpClient, 'Api')
export class DataRepo {
	constructor(httpClient, api) {
		httpClient.configure(option => {
			option.withDefaults({
				mode: 'no-cors'S
			});
		});
		this.httpClient = httpClient;
		this.api = api;
	}

	getCountryList() {
		return this.httpClient.fetch(this.api + "/drzava")
					.then(response => {
						console.log(response);
					});
	}


}