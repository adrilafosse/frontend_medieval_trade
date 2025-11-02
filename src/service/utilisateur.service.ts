import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  utilisateur: Utilisateur | null = null;
}
