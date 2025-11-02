export class Utilisateur {
  public id_utilisateur: number;
  public pseudo: string;
  public fk_metier : number;
  public niveau : number;
  public metier : string;
  constructor(id_utilisateur: number,pseudo: string, fk_metier: number, niveau: number, metier: string) {
    this.id_utilisateur = id_utilisateur;
    this.pseudo = pseudo;
    this.fk_metier = fk_metier;
    this.niveau = niveau;
    this.metier = metier;
  }
}
