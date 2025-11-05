import { Ressource } from "./ressource.model";

export class Fabrication {
  public id_fabrication: number;
  public produit: string;
  public list: Ressource[] = [];
  public afficher : Boolean = true;
  public qauntite_produit : number;
  constructor(id_fabrication: number,produit: string,list:Ressource[],afficher : Boolean, qauntite_produit: number) {
    this.id_fabrication = id_fabrication;
    this.produit = produit;
    this.list = list;
    this.afficher = afficher;
    this.qauntite_produit = qauntite_produit;
  }
}
