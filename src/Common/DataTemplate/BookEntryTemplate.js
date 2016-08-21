export class BookEntryTemplate {
	constructor(id, fname, lname, email, pnumber, country, 
				city, camp, parcelaCode, parcelaId, ardate, dpdate, isSelected) {
		this.id = id;
		this.fname = fname;
		this.lname =lname;
		this.email = email;
		this.pnumber = pnumber;
		this.country = country;
		this.city = city;
		this.camp = camp;
		this.parcelaCode = parcelaCode;
		this.parcelaId = parcelaId;
		this.ardate = ardate;
		this.dpdate = dpdate;
		this.isSelected = isSelected;
	}
}