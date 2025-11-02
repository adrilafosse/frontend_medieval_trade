export class Inventaire {
  public id_inventaire: number;
  public fk_ressource: number;
  public nom: string;
  public quantite: number;
  constructor(id_inventaire: number,fk_ressource: number,nom:string,quantite:number ) {
    this.id_inventaire = id_inventaire;
    this.fk_ressource = fk_ressource;
    this.nom = nom;
    this.quantite = quantite;
  }
}
