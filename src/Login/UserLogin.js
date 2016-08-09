import {AuthService} from "aurelia-authentication";
import {inject, computedFrom} from "aurelia-framework";

@inject(AuthService)
export class UserLogin {
	constructor(AuthService) {
		this.AuthService = AuthService;
		this.UserName = "";
		this.Password = "";
	}

	@computedFrom("authService.authenticated")
	get authenticated() {
		return this.authService.isAuthenticated;
	}
	
	Login(username = this.UserName, password = this.Password) {
		return this.AuthService.login({username, password});
    }

	Logout() {
		return this.AuthService.logout();
	}

}