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

  inventaireSelectionner : Inventaire | null = null;
  quantiteAchat : number =1;
  kamas : number = 0;
  prix_unitaire : number = 0;
  afficher : Boolean = true;
  quantite_vente: number = 0;
  quantite: number = 0;
  utilisateur: Utilisateur | null = null;
  listInventaire: Inventaire[] = [];
  listfabrication: Fabrication[] = [];
  bool_nom: Boolean = false;
  bool_quantite: Boolean = false;
  bool_pseudo: Boolean = false;
  bool_prix: Boolean = false;
  listRessource : Ressource[] = [];
  listRessourceProduit: Ressource_produit[] = [];
  listVente: Vente[] = [];
  ressource_produit: Ressource_produit| null = null;
  ressource_vente: Ressource_produit | null = null;
  venteSelectionnee: Vente  | null = null;
  afficherProduit: Boolean = true
  fabrication: Fabrication | null = null;

  url ='http://localhost:5000';
  barre(event: Event, produit : Fabrication) {
    const input = event.target as HTMLInputElement;
    produit.qauntite_produit = input.valueAsNumber;
  }
  ngOnInit() {
    this.utilisateur = this.utilisateurService.utilisateur;
    this.fabrication_possible();
    this.inventaire();
    this.http.get(this.url+'/ressource').subscribe({
      next: (res: any) => {
        console.log(res.message);
        for(let i=0;i<res.resultat.length;i++){
          if(res.resultat[i].fk_ressource != 16){
            this.listRessourceProduit.push(new Ressource_produit(res.resultat[i].id_ressource,res.resultat[i].nom));
          }

        }
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
  recuperation_vente(ressource_vente : Ressource_produit | null ){
    this.listVente = [];
    this.venteSelectionnee = null;
    const données3 = {id_utilisateur:this.utilisateur?.id_utilisateur, id_ressource:ressource_vente?.id_ressource}
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
  fabriquer(produit : Fabrication){
    produit.afficher = ! produit.afficher;
    produit.qauntite_produit = 1;
  }
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
  vendre(){
    this.afficher = !this.afficher
  }

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
    const données = {id_utilisateur:this.utilisateur?.id_utilisateur, quantite:this.quantiteAchat,id_vente:this.venteSelectionnee?.id_vente }
    this.http.post(this.url+'/acheter', données).subscribe({
      next: (res: any) => {
        console.log(res.message);
        this.listInventaire = [];
         for(let i=0;i<res.resultat.length;i++){
          if(res.resultat[i].fk_ressource == 16){
            this.kamas = res.resultat[i].quantité;
          }else{
            this.listInventaire.push(new Inventaire(res.resultat[i].id_inventaire,res.resultat[i].fk_ressource,res.resultat[i].nom,res.resultat[i].quantité));
          }
         }
         this.listVente = [];
         for(let i=0;i<res.resultat2.length;i++){
          this.listVente.push(new Vente(res.resultat2[i].id_vente,res.resultat2[i].prix,res.resultat2[i].quantite,res.resultat2[i].fk_utilisateur,res.resultat2[i].fk_ressource,res.resultat2[i].nom,res.resultat2[i].pseudo));
        }
        for(let x=0;x<this.listfabrication.length;x++){
            for(let j=0;j<this.listfabrication[x].list.length;j++){
              for(let y=0;y<this.listInventaire.length;y++){
                if(this.listfabrication[x].list[j].ressource == this.listInventaire[y].nom){
                  this.listfabrication[x].list[j].quantite_possede = this.listInventaire[y].quantite;
                }
              }
            }
          }
      },
      error: (err) => {
        alert(err.error.message);
      }
    });

  }
  fabriquer_produit(produit : Fabrication){
    const données = {id_utilisateur:this.utilisateur?.id_utilisateur,id_fabrication:produit.id_fabrication, quantite: produit.qauntite_produit }
    this.http.post(this.url+'/fabrication', données).subscribe({
      next: (res: any) => {
        console.log(res.message);
        produit.qauntite_produit = 1;
        this.listInventaire = []
        for(let i=0;i<res.resultat.length;i++){
          if(res.resultat[i].fk_ressource == 16){
            this.kamas = res.resultat[i].quantité;
          }else{
            this.listInventaire.push(new Inventaire(res.resultat[i].id_inventaire,res.resultat[i].fk_ressource,res.resultat[i].nom,res.resultat[i].quantité));
          }
          for(let x=0;x<this.listfabrication.length;x++){
            for(let j=0;j<this.listfabrication[x].list.length;j++){
              for(let y=0;y<this.listInventaire.length;y++){
                if(this.listfabrication[x].list[j].ressource == this.listInventaire[y].nom){
                  this.listfabrication[x].list[j].quantite_possede = this.listInventaire[y].quantite;
                }
              }
            }
          }
        }
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }

  fabrication_possible(){
    const données = {fk_metier: this.utilisateur?.fk_metier, niveau: this.utilisateur?.niveau, id_utilisateur:this.utilisateur?.id_utilisateur};
    this.http.post(this.url+'/fabrication_possible', données).subscribe({
          next: (res: any) => {
            console.log(res.message);
            for(let i=0;i<res.resultat.length;i++){
              if(this.listfabrication.length > 0){
                let bool = false;
                for(let j =0;j<this.listfabrication.length;j++){
                  if(this.listfabrication[j].id_fabrication == res.resultat[i].id_fabrication){
                    this.listfabrication[j].list.push(new Ressource(res.resultat[i].nom, res.resultat[i].quantite,res.resultat[i].quantite_possedee))
                    bool = true;
                  }
                }if(bool == false){
                  this.listRessource.push(new Ressource(res.resultat[i].nom, res.resultat[i].quantite,res.resultat[i].quantite_possedee));
                  this.listfabrication.push(new Fabrication(res.resultat[i].id_fabrication,res.resultat[i].produit, this.listRessource, true, 1));
                  this.listRessource = [];
                }
              }else{
                this.listRessource.push(new Ressource(res.resultat[i].nom, res.resultat[i].quantite,res.resultat[i].quantite_possedee));
                this.listfabrication.push(new Fabrication(res.resultat[i].id_fabrication,res.resultat[i].produit,this.listRessource, true, 1));
                this.listRessource = [];
              }
            }
          },
          error: (err) => {
           alert(err.error.message);
          }
    });
  }
  inventaire(){
    const données2 = {id_utilisateur:this.utilisateur?.id_utilisateur}
    this.http.post(this.url+'/inventaire', données2).subscribe({
      next: (res: any) => {
        console.log(res.message);
        for(let i=0;i<res.resultat.length;i++){
          if(res.resultat[i].fk_ressource == 16){
            this.kamas = res.resultat[i].quantité;
          }else{
            this.listInventaire.push(new Inventaire(res.resultat[i].id_inventaire,res.resultat[i].fk_ressource,res.resultat[i].nom,res.resultat[i].quantité));
          }
        }
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
  vente(id_ressource : number | undefined, quantite : number, prix :number){
    if(quantite > 0 && prix > 0){
      const données3 = {id_utilisateur:this.utilisateur?.id_utilisateur, id_ressource:id_ressource,quantite:quantite,prix:prix }
      this.http.post(this.url+'/mettre_vente', données3).subscribe({
        next: (res: any) => {
          console.log(res.message);
          this.listInventaire = [];
          for(let i=0;i<res.resultat.length;i++){
            if(res.resultat[i].fk_ressource == 16){
              this.kamas = res.resultat[i].quantité;
            }else{
              this.listInventaire.push(new Inventaire(res.resultat[i].id_inventaire,res.resultat[i].fk_ressource,res.resultat[i].nom,res.resultat[i].quantité));
            }
          }
          for(let x=0;x<this.listfabrication.length;x++){
            for(let j=0;j<this.listfabrication[x].list.length;j++){
              for(let y=0;y<this.listInventaire.length;y++){
                if(this.listfabrication[x].list[j].ressource == this.listInventaire[y].nom){
                  this.listfabrication[x].list[j].quantite_possede = this.listInventaire[y].quantite;
                }
              }
            }
          }
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
      this.quantite = 0;
      this.prix_unitaire = 0;
    }else{
       alert("Vous devez choisir une quantité et un prix");
    }
  }
  clickRadio(vente : any){
    if (this.venteSelectionnee == vente) {
      this.venteSelectionnee = null;
    } else {
    this.venteSelectionnee = vente;
  }
  }
}
