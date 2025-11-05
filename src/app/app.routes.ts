import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
  { path: '', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'accueil', component: AccueilComponent }
];
