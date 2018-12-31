import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any;

  constructor(private authService: AuthService) {
    this.model = {};
  }

  ngOnInit() {}
  login() {
    console.log(this.model);
    this.authService.login(this.model).subscribe(
      next => {
        console.log("Logged in successfully");
      },
      error => {
        console.log("falied");
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.decodedToken = null;
    // this.authService.currentUser = null;
    // this.alertify.message("logged out");
    // this.router.navigate(["/home"]);
  }
}
