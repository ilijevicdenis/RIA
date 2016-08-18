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


	Save() {
		this.dialogController.ok();
	}

	Cancel() {
		this.dialogController.cancel();
	}
}