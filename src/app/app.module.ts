import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InscriptionComponent} from './membre_auth/inscription/inscription.component';
import {LoginComponent} from './membre_auth/login/login.component';
import {HomeComponent} from './standard/home/home.component';
import {FooterComponent} from './standard/footer/footer.component';
import {httpInterceptorProviders} from './membre_auth/auth/auth-interceptor';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './standard/navbar/navbar.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PayementComponent} from './payement/payement.component';
import {EvenementComponent} from './interaction_event/evenement/evenement.component';
import {TestComponent} from './test/test.component';
import {Page404Component} from './page404/page404.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import {SponsorComponent} from './sponsorsDirectory/sponsor/sponsor.component';
import {TabBordComponent} from './tableau_bord/tab-bord/tab-bord.component';
import {EspaceAdherentComponent} from './tableau_bord/espace-adherent/espace-adherent.component';
import {DonsBiensComponent} from './tableau_bord/dons-biens/dons-biens.component';
import {ActivBenevoleComponent} from './tableau_bord/activ-benevole/activ-benevole.component';
import {InscriptionEventComponent} from './tableau_bord/inscription-event/inscription-event.component';
import {DonnerBiensComponent} from './interaction_event/donner-biens/donner-biens.component';
import {DevenirBenevoleComponent} from './interaction_event/devenir-benevole/devenir-benevole.component';
import {DevenirAdherentComponent} from './interaction_event/devenir-adherent/devenir-adherent.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MbscModule} from "@mobiscroll/angular-lite";
import { EventDetailComponent } from './interaction_event/event-detail/event-detail.component';

@NgModule({
  /* declarations array ensemble des compons utilisée*/
  declarations: [
    AppComponent,
    InscriptionComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    PayementComponent,
    EvenementComponent,
    TestComponent,
    Page404Component,
    SponsorComponent,
    TabBordComponent,
    EspaceAdherentComponent,
    DonsBiensComponent,
    ActivBenevoleComponent,
    InscriptionEventComponent,
    DonnerBiensComponent,
    DevenirBenevoleComponent,
    DevenirAdherentComponent,
    EventDetailComponent
  ],
  /*imports array enesemble des libraries */
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FullCalendarModule, // for FullCalendar!

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgxPaginationModule,
    MbscModule

  ],

  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
