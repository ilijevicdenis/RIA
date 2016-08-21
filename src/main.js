/*
	Aurelia custom configuration function
	Author: Denis Ilijevic
*/

// Add to auth api reservation api.

import authConfig from "authConfig";

export function configure(aurelia) {
	
	aurelia.use
			.instance('Api', 'http://localhost/kamp');
			
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.plugin('aurelia-dialog');
		/*
		.plugin("aurelia-api", configure => {
			configure
				.registerEndpoint('public-api', 'http://localhost/kamp/user/login')
				.registerEndpoint('protected-api', 'http://localhost/kamp/booking/list')
				.registerEndpoint('auth', 'http://localhost/kamp/drzava')
				.registerEndpoint("protected-api", "http://localhost/kamp/drzava/add")
				.registerEndpoint("protected-api", "http://localhost/kamp/kamp/add")
				.registerEndpoint("public-api", "http://localhost/kamp/search" )
				.registerEndpoint("protected-api", "http://localhost/kamp/parcela/availability")
				.registerEndpoint("protected-api", "http://localhost/kamp/parcela/add")
		})
		.plugin("aurelia-authentication", baseconfig => {
			baseconfig.configure(authConfig);
			 baseconfig.client.client
     			 .withBaseUrl('http://localhost/kamp/user/login')
      			 .withDefaults({
        			credentials: 'same-origin',
        			headers: {
          				'Accept': 'application/json',
          				'X-Requested-With': 'Fetch'
       		 		}
      			})
      			.withInterceptor({
        			response(response) {
          				return response;
        			}
      			}); 
		}); */
	aurelia.start().then(a => a.setRoot("shell"));
}