export class Vente {
  public id_vente: number;
  public prix: number;
  public quantite: number;
  public fk_utilisateur: number;
  public fk_ressource: number;
  public nom: string;
  public pseudo: string;
  constructor(id_vente: number,prix: number,quantite: number,fk_utilisateur: number,fk_ressource: number,nom: string, pseudo: string) {
    this.id_vente = id_vente;
    this.prix = prix;
    this.quantite = quantite;
    this.fk_utilisateur = fk_utilisateur;
    this.fk_ressource = fk_ressource;
    this.nom = nom;
    this.pseudo = pseudo;
  }
}
