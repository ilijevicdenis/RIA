/* 
	Aurelia configuration file for accessing web backend API.
	Author: Denis Ilievic
	Created on: 07/08/2016
	Contact: dilijevic@riteh.hr
*/

export default {
	endpoint: "auth",
	configureEndpoints: ["auth", "protected-api"],
	loginRedirect: "#/",
	logoutRedirect: "#/",
	loginRoute: "#/login",
	signupRedirect: "#/register",
	baseUrl: "localhost/kamp",
	loginUrl: "localhost/kamp/user/login",
	signupUrl: "localhost/kamp/user/singup",
	loginOnSignuip: false,
	expiredRedirect: 1
}