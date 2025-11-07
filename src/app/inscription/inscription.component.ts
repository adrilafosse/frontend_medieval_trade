import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UtilisateurService } from '../../service/utilisateur.service';
import { Utilisateur } from '../../models/utilisateur.model';
import { Metier } from '../../models/metier.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  constructor(private http: HttpClient, private router: Router, private utilisateurService: UtilisateurService) {}
  url ='https://backend-medieval-trade-345909199633.europe-west1.run.app';
  //url ='http://localhost:8080';

  pseudo: string = '';
  mot_de_passe: string = '';
  utilisateur?: Utilisateur;
  metier: Metier = new Metier(0,'');
  fk_metier: number = 0;
  listMetier: Metier[] = [];
  ngOnInit() {
     this.http.get(this.url+'/metiers').subscribe({
      next: (res: any) => {
        console.log(res.message);
        for(let i=0;i<res.resultat.length;i++){
          this.listMetier.push(new Metier(res.resultat[i].id_metier, res.resultat[i].nom));
        }
      },
      error: (err) => {
        alert(err.error.message);
      }
    });;
  }
  inscription(){
    if(this.pseudo != '' && this.mot_de_passe != '' && this.metier.id_metier != 0){
      const données = {pseudo: this.pseudo, mot_de_passe: this.mot_de_passe, id_metier: this.metier.id_metier};
      this.http.post(this.url+'/inscription', données).subscribe({
          next: (res: any) => {
            console.log(res.message);
            this.utilisateurService.utilisateur = new Utilisateur(res.resultat.id_utilisateur,this.pseudo, this.metier.id_metier, 3, this.metier.nom);
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
  connexion(){
    this.router.navigate(['']);
  }
}
