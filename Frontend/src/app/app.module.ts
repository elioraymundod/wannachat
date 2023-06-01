import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule, MatCardTitle} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatGptServiceService } from './services/ChatGptService.service';
import { CatalogoInteresesComponent } from './components/catalogo-intereses/catalogo-intereses.component';
import { UsersServiceService } from './services/Users.service';
import { InteresesService } from './services/Intereses.service';
import { PrincipalWannaComponent } from './components/principal-wanna/principal-wanna.component';
import {MatButtonModule} from '@angular/material/button';
import { MaterialExampleModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    CatalogoInteresesComponent,
    PrincipalWannaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MaterialExampleModule
  ],
  providers: [ChatGptServiceService, UsersServiceService, InteresesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
