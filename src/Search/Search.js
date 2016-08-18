import {inject} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";
import {CampingSearchTemplate} from "Common/DataTemplate/CampingSearchTemplate";

@inject(DataRepo)
export class Search {
	constructor(Datarepo) {
		this.repo = Datarepo;
		this.searchList = [];
		this.CountryList = [];
		this.SelectedCountry = "";
		this.searchListBackup = [];
	}

	activate() {
		return Promise.all([ 
				this.repo.getAvailableCampingList()
					.then(list => {
						for (let item of list) {
							let searchItem = new CampingSearchTemplate(
								item.ID, item.Camp, item.CampDescription,
								item.Country, item.City, item.Address, item.Parcele);
								this.searchList.push(searchItem);
							}
				}),
				this.repo.getCountryList().then(list => {
					for(let country of list) {
						this.CountryList.push(country.naziv);
					}
				})
			]);
	}

	filterByCountry() {
		this.saveOriginalList();
		this.searchList = this.searchList.filter(item => item.Country === this.SelectedCountry);
	}

	saveOriginalList() {
		this.searchListBackup = this.searchList;
	}

	resetFilter() {
		this.searchList = this.searchListBackup;
		this.SelectedCountry = "";
	}
}