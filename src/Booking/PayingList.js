import {inject} from "aurelia-framework";
import {DataRepo} from "Common/DataRepo";

@inject(DataRepo)
export class PayingList {
	constructor(DataRepo) {
		this.repo = DataRepo;
		this.PayList = [];
	}

	activate() {
		return this.repo.getPayingList().then(list => {
				this.PayList = list;
				console.log(this.PayList);
		});
	}
}