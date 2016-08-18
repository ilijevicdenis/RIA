import {DataRepo} from "Common/DataRepo";
import {inject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {EditReservation} from "Booking/EditReservation";
import {BookEntryTemplate} from "Common/DataTemplate/BookEntryTemplate";
import {DeleteReservation} from "Booking/DeleteReservation";

@inject(DataRepo, DialogService)
export class BookingList {
	constructor(DataRepo, dialogService) {
		this.dataRepo = DataRepo;
		this.dialogService = dialogService;
		this.bookingList = [];
		this.bookEntry = "";
		this.selectedItemId = "";
}

	activate() {
		return this.dataRepo.getBookingList().then(blist => {
			var id = 0;
			for(let item of blist) {
				let tempItem = new BookEntryTemplate(id, item.fname, item.lname, 
					 item.email, item.pnumber, item.country, item.city, item.camp, item.parcelaCode, 
					 item.parcelaId, item.rsdate, item.ardate, item.dpdate, false);
				id++;
				this.bookingList.push(tempItem);
			}
		});
	}

	fetchReservation(BookingEntry) {
		this.bookingList.forEach(x => x.isSelected = false);
		this.bookingList.filter(x => x.id === BookingEntry.id)[0].isSelected = true;
		
		for(let entry of this.bookingList) {
			if(entry.isSelected === true) {
				this.bookEntry = entry;
				this.selectedItemId = entry.id;
			}
		}
	}

	restoreData() {
		this.bookingList[this.selectedItemId] = this.bookEntry;
	}

	updateReservation(BookingEntry) {		
		this.fetchReservation(BookingEntry);
		this.dialogService.open({viewModel: EditReservation, model: this.bookEntry})
			.then(result => {
				if(result.wasCancelled) {
					this.restoreData();
				}
				else {
					this.dataRepo.updateReservation(generateJSON());
				}
			});

	}

	deleteReservation(BookingEntry) {
		this.fetchReservation(BookingEntry);
		this.dialogService.open({viewModel: DeleteReservation, model: this.bookEntry})
		.then(result => {
			if(result.wasCancelled) {
				this.restoreData();
			}
			else {
				this.dataRepo.deleteReservation(generateJSON());
			}
		});
	}

	generateJSON() {
		let ReservationObject = {
			id: this.bookEntry.id,
			fname: this.bookEntry.fname,
			lname: this.bookEntry.lname,
			email: this.bookEntry.email,
			pnumber: this.bookEntry.pnumber,
			country: this.bookEntry.country,
			city: this.bookEntry.city,
			camp: this.bookEntry.camp,
			parcelaCode: this.bookEntry.parcelaCode,
			parclaId: this.bookEntry.parcelaId,
			rsdate: this.bookEntry.rsdate,
			ardate: this.bookEntry.ardate,
			dpdate: this.bookEntry.dpdate,
		}

		return ReservationObject;
	}
}