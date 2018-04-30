import { NgModule} from '@angular/core';
import { LoginComponent } from './login/login.component.';
import { RegisterComponent } from './register/register.component';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [LoginComponent,
    RegisterComponent],
	imports: [CommonModule, IonicModule],
	exports: [LoginComponent,
	RegisterComponent]

})
export class ComponentsModule {}
