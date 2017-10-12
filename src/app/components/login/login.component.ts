import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HomeComponent} from "../home.component";
import {RobinhoodService} from "../../services/RobinhoodService";
/**
 * Created by roy_f on 7/31/2017.
 */

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],

})
export class LoginComponent {
    title = 'app';

    public loginModel = {
        username: "",
        password: ""
    }

    constructor(public router: Router, public rh: RobinhoodService) {

    }

     public clickLogin(){
      console.log("Logging in");
      this.rh.startService(this.loginModel.username, this.loginModel.password).then(res=>{
        this.router.navigateByUrl("home");
      })
    }

}
