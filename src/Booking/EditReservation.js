import {DialogController} from "aurelia-dialog";
import {inject} from "aurelia-framework";

@inject(DialogController)
export class EditReservation {
	constructor(DialogController) {
		this.dialogController = DialogController;
	}

	activate(bookEntry) {
		this.bookEntry = bookEntry;
	}

	// this.dialogController.ok()
	// this.dialogController.cancel();
}