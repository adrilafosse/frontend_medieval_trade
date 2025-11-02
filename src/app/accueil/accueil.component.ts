import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UtilisateurService } from '../../service/utilisateur.service';
import { Utilisateur } from '../../models/utilisateur.model';
import { Fabrication } from '../../models/fabrication';
import { CommonModule } from '@angular/common';
import { Ressource } from '../../models/ressource.model';
import { Inventaire } from '../../models/inventaire.model';
import { Ressource_produit } from '../../models/ressource_produit';
import { Vente } from '../../models/vente.model';
@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  constructor(private http: HttpClient, private router: Router, private utilisateurService: UtilisateurService) {}

  utilisateur: Utilisateur | null = null;
  listInventaire: Inventaire[] = [];
  listRessource: Ressource[] = [];
  listfabrication: Fabrication[] = [];
  bool_nom: Boolean = false;
  bool_quantite: Boolean = false;
  bool_pseudo: Boolean = false;
  bool_prix: Boolean = false;
  listRessourceProduit: Ressource_produit[] = [];
  listVente: Vente[] = [];
  ressource_produit: Ressource_produit| null = null;
  venteSelectionnee: Vente  | null = null;
  url ='http://localhost:5000';
  ngOnInit() {
    this.utilisateur = this.utilisateurService.utilisateur;
    const données = {fk_metier: this.utilisateur?.fk_metier, niveau: this.utilisateur?.niveau};
    this.http.post(this.url+'/fabrication_possible', données).subscribe({
          next: (res: any) => {
            console.log(res.message);
            for(let i=0;i<res.resultat.length;i++){
              if(this.listfabrication.length > 0){
                let bool = false;
                for(let j =0;j<this.listfabrication.length;j++){
                  if(this.listfabrication[j].id_fabrication == res.resultat[i].id_fabrication){
                    this.listfabrication[j].list.push(new Ressource(res.resultat[i].nom, res.resultat[i].quantite))
                    bool = true;
                  }
                }if(bool == false){
                  this.listRessource.push(new Ressource(res.resultat[i].nom, res.resultat[i].quantite));
                  this.listfabrication.push(new Fabrication(res.resultat[i].id_fabrication,res.resultat[i].produit, this.listRessource));
                  this.listRessource = [];
                }
              }else{
                this.listRessource.push(new Ressource(res.resultat[i].nom, res.resultat[i].quantite));
                this.listfabrication.push(new Fabrication(res.resultat[i].id_fabrication,res.resultat[i].produit,this.listRessource));
                this.listRessource = [];
              }
            }
          },
          error: (err) => {
           alert(err.error.message);
          }
    });
    const données2 = {id_utilisateur:this.utilisateur?.id_utilisateur}
    this.http.post(this.url+'/inventaire', données2).subscribe({
      next: (res: any) => {
        console.log(res.message);
        for(let i=0;i<res.resultat.length;i++){
          this.listInventaire.push(new Inventaire(res.resultat[i].id_inventaire,res.resultat[i].fk_ressource,res.resultat[i].nom,res.resultat[i].quantité));
        }
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
    this.http.get(this.url+'/ressource').subscribe({
      next: (res: any) => {
        console.log(res.message);
        for(let i=0;i<res.resultat.length;i++){
          this.listRessourceProduit.push(new Ressource_produit(res.resultat[i].id_ressource,res.resultat[i].nom));
        }
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
  recuperation_vente(){
    this.listVente = [];
    this.venteSelectionnee = null;
    const données3 = {id_utilisateur:this.utilisateur?.id_utilisateur, id_ressource:this.ressource_produit?.id_ressource}
    this.http.post(this.url+'/tableau_vente', données3).subscribe({
      next: (res: any) => {
        console.log(res.message);
        for(let i=0;i<res.resultat.length;i++){
          this.listVente.push(new Vente(res.resultat[i].id_vente,res.resultat[i].prix,res.resultat[i].quantite,res.resultat[i].fk_utilisateur,res.resultat[i].fk_ressource,res.resultat[i].nom,res.resultat[i].pseudo));
        }
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
  changer_metier(){}
  augmenter_niveau(){}
  fabriquer(produit : Fabrication){}
  trier_nom(){
    if(this.bool_nom == false){
      this.listInventaire.sort((a, b) => a.nom.localeCompare(b.nom));
      this.bool_nom = true;
    }else{
      this.listInventaire.sort((a, b) => b.nom.localeCompare(a.nom));
      this.bool_nom = false;
    }
  }
  trier_quantite(){
    if(this.bool_quantite == false){
      this.listInventaire.sort((a, b) => a.quantite - b.quantite);
      this.bool_quantite = true;
    }else{
      this.listInventaire.sort((a, b) => b.quantite - a.quantite);
      this.bool_quantite = false;
    }
  }
  vendre(){}

  trier_pseudo(){
    if(this.bool_pseudo == false){
      this.listVente.sort((a, b) => a.pseudo.localeCompare(b.pseudo));
      this.bool_pseudo = true;
    }else{
      this.listVente.sort((a, b) => b.pseudo.localeCompare(a.pseudo));
      this.bool_pseudo = false;
    }
  }
  trier_prix(){
    if(this.bool_prix == false){
      this.listVente.sort((a, b) => a.prix - b.prix);
      this.bool_prix = true;
    }else{
      this.listVente.sort((a, b) => b.prix - a.prix);
      this.bool_prix = false;
    }
  }
  acheter(){
    console.log(this.venteSelectionnee)
  }
}
