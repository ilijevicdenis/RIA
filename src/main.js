/*
	Aurelia custom configuration function
	Author: Denis Ilijevic
*/


export function configure(aurelia) {
	
	aurelia.use
			.instance('Api', 'http://localhost/kamp');
			
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.plugin('aurelia-dialog');
	aurelia.start().then(a => a.setRoot("shell"));
}