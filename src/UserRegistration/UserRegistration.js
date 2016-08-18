import {inject, BindingEngine} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";

@inject(DataRepo, BindingEngine)
export class UserRegistration {
	constructor(DataRepo, BindingEngine) {
		this.Repo = DataRepo;
		this.bindEngine = BindingEngine
		this.CountryList = [];
		this.CityList = [];
		this.SelectedCountry = "";
		this.SelectedCity = "";
		this.FirstName = "";
		this.LastName = "";
		this.StreetAddress = "";
		this.Email = ""
		this.Password = "";
		this.CityListUpdater = this.bindEngine.propertyObserver(this, "SelectedCountry")
							.subscribe( newvalue => {
								this.Repo.getCityListForCountry(newvalue).then(list => this.CityList = list);
							});
	} 

	activate() {
		return this.Repo.getCountryList().then(list => {
			for(let item of list)
				this.CountryList.push(item.naziv);
		});
	}


	Register() {
		let NewuserObject = {
			Country: this.SelectedCountry,
			City: this.SelectedCity,
			FirstName: this.FirstName,
			LastName: this.LastName,
			Address: this.StreetAddress,
			Email: this.Email,
			Password: this.Password
		};

		this.Repo.saveUser(NewuserObject);
	}

	Cancel() {
		this.FirstName = "";
		this.LastName = "";
		this.StreetAddress = "";
		this.Email = ""
		this.Password = "";
		this.SelectedCountry = "Croatia";
	}

	deactivate() {
		this.CityListUpdater.dispose();
	}
}