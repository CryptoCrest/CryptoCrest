import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
    
  constructor(public auth: AuthService, private router: Router){}
    logout() {
      if (confirm('Are you sure?')) {
        this.auth.clear();
        this.router.navigateByUrl("/");
      }

  }
}