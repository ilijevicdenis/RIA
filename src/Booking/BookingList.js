import {DataRepo} from "Common/DataRepo";
import {inject} from "aurelia-framework";

@inject(DataRepo)
export class BookingList {
	constructor(DataRepo) {
		this.dataRepo = DataRepo;
		this.bookingList = [];
	}

	activate() {
		return this.dataRepo.getBookingList().then(blist => {
			this.bookingList = blist;
		});
	}
}