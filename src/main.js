/*
	Aurelia custom configuration function
	Author: Denis Ilijevic
*/


export function configure(aurelia) {
	
	aurelia.use
			.instance('Api', 'http://localhost:1001/kamp');
			
	aurelia.use
		.standardConfiguration()
		.developmentLogging();
	
	aurelia.start().then(a => a.setRoot("shell"));
}