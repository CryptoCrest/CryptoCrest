import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PartialsModule } from './partials/partials.module';
import { IndexComponent } from './index.component';


@NgModule({
    imports: [
        BrowserModule, FormsModule, PartialsModule],
  declarations: [
    IndexComponent
  ],
  exports:[IndexComponent]
 
})
export class IndexModule { }
