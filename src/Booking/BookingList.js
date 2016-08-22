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
			for(let item of blist) {
				let tempItem = new BookEntryTemplate(item.id, item.fname, item.lname, 
					 item.email, item.pnumber, item.country, item.city, item.campName,
					 item.campID, item.parcelaCode,
					 item.parcelaId, item.ardate, item.dpdate, false);
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
					console.log(JSON.stringify(this.generateJSON()));
					this.dataRepo.updateReservation(this.generateJSON());
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
				console.log(JSON.stringify(this.generateJSON()));
				this.dataRepo.deleteReservation(this.generateJSON());
			}
		});
	}

	generateJSON() {
		let ReservationObject = {
			fname: this.bookEntry.fname,
			lname: this.bookEntry.lname,
			email: this.bookEntry.email,
			pnumber: this.bookEntry.pnumber,
			country: this.bookEntry.country,
			city: this.bookEntry.city,
			camp: this.bookEntry.campID,
			parcelaId: this.bookEntry.parcelaId,
			ardate: this.bookEntry.ardate,
			dpdate: this.bookEntry.dpdate,
			gostovanjeId: this.bookEntry.id
		};

		return ReservationObject;
	}
}