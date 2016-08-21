import {inject, BindingEngine} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";

@inject(BindingEngine, DataRepo)
export class ParcelaPicture {
	constructor(BindingEngine, DataRepo) {
		this.bindEngine = BindingEngine;
		this.repo = DataRepo;
		this.CountryList = [];
		this.CityList = [];
		this.CampList = [];
		this.ParcelaIds = [];
		this.ParcelaId = "";
		this.SelectedCountry = "";
		this.SelectedCity = "";
		this.SelectedCamp = "";
		this.ImagePath = "";

	this.UpdateCityList = this.bindEngine.propertyObserver(this, "SelectedCountry")
								  .subscribe( newvalue => {
								  	this.repo.getCityListForCountry(newvalue).then(list => {
								  		this.CityList = list;
								  	})
								  });
		
	this.UpdateCampList = this.bindEngine.propertyObserver(this, "SelectedCity")
									.subscribe(newvalue => {
										this.repo.getCampList(this.SelectedCountry, newvalue).then(list => {
											this.CampList = list;
										})
									});

			this.UpdateId = this.bindEngine.propertyObserver(this, "SelectedCamp")
			.subscribe(newvalue => {
				this.repo.getIds(this.SelectedCountry, this.SelectedCity, newvalue)
				.then(idlist => {
					this.ParcelaIds = [];
					if(this.SelectedCity != "" && this.SelectedCamp != "") {
						this.ParcelaIds = [];
						for(let item of idlist)
							this.ParcelaIds.push(item.parcelaId);
					}
				})
			});
	}

	ResetForm() {
		this.SelectedCountry = "Croatia";
		this.SelectedCity = "Pula";
		this.SelectedCamp = "";
		this.ImagePath = "";
		this.ParcelaCode = "";
	}

	Save() {
		let NewPictureObject = {
			ParcelaID: this.ParcelaId,
			ImagePath: this.ImagePath
		};
		console.log(JSON.stringify(NewPictureObject));
		this.repo.savePicture(NewPictureObject);
	}

	activate() {
		return this.repo.getCountryList().then(list => {
			for(let item of list)
				this.CountryList.push(item.naziv);
		});
	}

	deactivate() {
		this.UpdateCityList.dispose();
		this.UpdateCampList.dispose();
	}
}