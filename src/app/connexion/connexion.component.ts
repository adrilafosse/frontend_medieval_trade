import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Utilisateur } from '../../models/utilisateur.model';
import { UtilisateurService } from '../../service/utilisateur.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  constructor(private http: HttpClient, private router: Router, private utilisateurService: UtilisateurService) {}
  //url ='https://backend-medieval-trade-345909199633.europe-west1.run.app';
  url ='http://localhost:8080';

  pseudo: string = '';
  mot_de_passe: string = '';
  utilisateur?: Utilisateur;
  connexion(){
    if(this.pseudo != '' && this.mot_de_passe != ''){
      const données = {pseudo: this.pseudo, mot_de_passe: this.mot_de_passe};
      this.http.post(this.url+'/connexion', données).subscribe({
          next: (res: any) => {
            console.log(res.message);
            this.utilisateurService.utilisateur = new Utilisateur(res.resultat.id_utilisateur,res.resultat.pseudo, res.resultat.fk_metier, res.resultat.niveau, res.resultat.nom);
            this.router.navigate(['accueil']);
          },
          error: (err) => {
           alert(err.error.message);
          }
        });
    }else{
      alert("Vous devez remplir tous les champs");
    }
  }
  inscription(){
    this.router.navigate(['inscription']);
  }
}
