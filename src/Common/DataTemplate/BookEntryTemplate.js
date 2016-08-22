export class BookEntryTemplate {
	constructor(id, fname, lname, email, pnumber, country, 
				city, campName, campID, parcelaCode, parcelaId, ardate, dpdate, isSelected) {
		this.id = id; //booking id
		this.fname = fname;
		this.lname =lname;
		this.email = email;
		this.pnumber = pnumber;
		this.country = country;
		this.city = city;
		this.campName = campName;
		this.campID = campID;
		this.parcelaCode = parcelaCode;
		this.parcelaId = parcelaId;
		this.ardate = ardate;
		this.dpdate = dpdate;
		this.isSelected = isSelected;
	}
}