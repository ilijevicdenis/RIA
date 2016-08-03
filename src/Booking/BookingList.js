import {DataRepo} from "Common/DataRepo";
import {inject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {EditReservation} from "Booking/EditReservation";
import {BookEntryTemplate} from "Common/DataTemplate/BookEntryTemplate";

@inject(DataRepo, DialogService, BookEntryTemplate)
export class BookingList {
	constructor(DataRepo, dialogService, BookEntryTemplate) {
		this.dataRepo = DataRepo;
		this.dialogService = dialogService;
		this.template = BookEntryTemplate;
		this.bookingList = [];
		this.bookEntry = "";
}

	activate() {
		return this.dataRepo.getBookingList().then(blist => {
			var entryId = 0;
			for(let item of blist) {
				++entryId;
				this.template.fname = item.fname;
				this.template.lname = item.lname;
				this.template.email = item.email;
				this.template.pnumber = item.pnumber;
				this.template.country = 	item.country;
				this.template.city = item.country;
				this.template.camp = item.camp;
				this.template.parcelaCode = item.parcelaCode;
				this.template.ardate = item.ardate;
				this.template.dpdate = item.dpdate;
				Console.log(this.template);
			}
		});
	}

	editReservation(bookEntry) {
		var originalObject = JSON.parse(JSON.stringify(bookEntry));
		this.dialogService.open({viewModel: EditReservation, model: this.bookEntry})
			.then(result => {
				if(result.wasCancelled) {
					// restore original data from originalObject
				}
			});
	}
}