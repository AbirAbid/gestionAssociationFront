import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './standard/home/home.component';
import {LoginComponent} from './membre_auth/login/login.component';
import {InscriptionComponent} from './membre_auth/inscription/inscription.component';
import {PayementComponent} from './payement/payement.component';
import {TestComponent} from './test/test.component';
import {Page404Component} from './page404/page404.component';
import {EvenementComponent} from './interaction_event/evenement/evenement.component';
import {SponsorComponent} from './sponsorsDirectory/sponsor/sponsor.component';
import {TabBordComponent} from './tableau_bord/tab-bord/tab-bord.component';
import {EspaceAdherentComponent} from './tableau_bord/espace-adherent/espace-adherent.component';
import {DonsBiensComponent} from './tableau_bord/dons-biens/dons-biens.component';
import {ActivBenevoleComponent} from './tableau_bord/activ-benevole/activ-benevole.component';
import {InscriptionEventComponent} from './tableau_bord/inscription-event/inscription-event.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'payement',
    component: PayementComponent

  },
  {
    path: 'evenementList',
    component: EvenementComponent

  },
  {
    path: 'test',
    component: TestComponent

  },
  {
    path: 'sponsorsList',
    component: SponsorComponent
  },
  {
    path: 'tabBord',
    component: TabBordComponent

  },
  {
    path: 'espaceAdherent',
    component: EspaceAdherentComponent

  },
  {
    path: 'mesDons',
    component: DonsBiensComponent

  },
  {
    path: 'missionsBenevole',
    component: ActivBenevoleComponent

  },
  {
    path: 'mesInscriptionEvent',
    component: InscriptionEventComponent

  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
