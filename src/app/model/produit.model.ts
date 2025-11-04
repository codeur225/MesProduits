import { Categorie } from "./categorie.model";
import { Fichier } from "./Fichier.model";

export class Produit {
  idProduit! : number;
  nomProduit! : string;
  prixProduit! : number;
  dateCreation! : Date ;
  categorie! : Categorie;
  fichier! : Fichier
  fichierStr!:string
}
