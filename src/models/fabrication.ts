import { Ressource } from "./ressource.model";

export class Fabrication {
  public id_fabrication: number;
  public produit: string;
  public list: Ressource[] = [];
  constructor(id_fabrication: number,produit: string,list:Ressource[] ) {
    this.id_fabrication = id_fabrication;
    this.produit = produit;
    this.list = list;
  }
}
