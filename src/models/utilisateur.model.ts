export class Utilisateur {
  public id_utilisateur: number;
  public pseudo: string;
  public fk_metier : number | undefined;
  public niveau : number;
  public metier : string | undefined;
  constructor(id_utilisateur: number,pseudo: string, fk_metier: number, niveau: number, metier: string) {
    this.id_utilisateur = id_utilisateur;
    this.pseudo = pseudo;
    this.fk_metier = fk_metier;
    this.niveau = niveau;
    this.metier = metier;
  }
  public setNiveau(niveau : number){
    this.niveau = niveau;
  }
  public setmetier(metier : string | undefined){
    this.metier = metier;
  }
  public setFk_metier(fk_metier : number | undefined){
    this.fk_metier = fk_metier;
  }
}

