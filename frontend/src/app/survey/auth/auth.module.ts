import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../../model/model.module";
import { PartialsModule } from '../partials/partials.module';
import { SignInComponent } from "./signin.component";
import { SignUpComponent } from "./signup.component";
import { UserprofileComponent } from "./userprofile.component";
import { EditprofileComponent } from "./editprofile.component";

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, PartialsModule],
    declarations: [SignInComponent, SignUpComponent, UserprofileComponent, EditprofileComponent],
    exports : [SignInComponent, SignUpComponent, UserprofileComponent, EditprofileComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AuthModule {}