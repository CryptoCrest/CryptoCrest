import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { PartialsModule } from './partials/partials.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent} from './header.component';
import { FooterComponent } from './footer.component';

@NgModule({
    imports: [
        BrowserModule, FormsModule, RouterModule],
  declarations: [
    HeaderComponent, FooterComponent
  ],
  exports:[HeaderComponent, FooterComponent]
 
})
export class PartialsModule { }
