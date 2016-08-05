import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";

@inject(DialogController)
export class DeleteReservation {
	constructor(DialogController) {
		this.dialogController = DialogController;
	}

	activate(bookEntry) {
		this.bookEntry = bookEntry;
	}

	Delete() {
		this.dialogController.ok();
	}

	Cancel() {
		this.dialogController.cancel();
	}
}