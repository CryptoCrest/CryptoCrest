import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../model/auth.service";
import { User } from "../../model/user.model";
import { UserRepository } from "../../model/user.repository";

@Component({
    selector: 'app-user',
    templateUrl: "userprofile.component.html"
})
export class UserprofileComponent  {
    

    constructor(public auth: AuthService, private router: Router, private repository: UserRepository)
    {
    }
   
    get userList(): User [] {
        return this.repository.getUser();
        
      
    }
    
}