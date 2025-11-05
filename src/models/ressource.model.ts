export class Ressource {
  public ressource: string;
  public quantite: number;
  public quantite_possede: number;
  constructor(ressource: string,quantite: number, quantite_possede:number) {
    this.ressource = ressource;
    this.quantite = quantite;
    this.quantite_possede=quantite_possede
  }
}
