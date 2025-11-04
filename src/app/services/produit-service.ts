import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLCat } from '../config';
import { environment } from '../../environments/environment';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { AuthService } from './auth-service';
import { Fichier } from '../model/Fichier.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits!: Produit[];
  // categories : Categorie[];
  produit!: Produit;
  constructor(private http: HttpClient, private authService: AuthService) {
    // this.categories = [
    //   {idCat : 1, nomCat : "PC"},
    //   {idCat : 2, nomCat : "Imprimante"}];
    // this.produits = [
    //   {idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011"), categorie : {idCat : 1, nomCat : "PC"}},
    //   {idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010") , categorie : {idCat : 2, nomCat : "Imprimante"}},
    //   {idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020"), categorie : {idCat : 1, nomCat : "PC"}}
    // ];
  }

  // listeProduits():Produit[] {
  //   return this.produits;
  // }

  // listeProduit(): Observable<Produit[]> {
  //   const url = `${apiURL}/all`;
  //   return this.http.get<Produit[]>(url); //appel de l'API rest avec variables globales
  // }

  listeProduit(): Observable<Produit[]> {
    // Cette syntaxe n'est plus utilisée avec l'intercepteur
    // return this.http.get<Produit[]>(apiURL + '/all', { headers: this.addHttpHeaderToken() });
    //Voici la nouvelle syntaxe avec l'intercepteur, plus besoin d'ajouter le header
    return this.http.get<Produit[]>(apiURL + '/all');
  }

  // ajouterProduit( prod: Produit){
  //   this.produits.push(prod);
  // }

  ajouterProduit(prod: Produit): Observable<Produit> {
    const url = `${apiURL}/addprod`;
    return this.http.post<Produit>(url, prod); //appel de l'API rest avec environnement
  }

  // supprimerProduit(p: Produit){
  //   //console.log(p);
  //   let conf = confirm("Etes-vous sûr ?");
  //   if (conf)
  //   this.produits?.splice(this.produits.indexOf(p),1);
  // }

  /*supprimerProduit( prod: Produit){
    //supprimer le produit prod du tableau produits
    //Methode 1
    const index = this.produits.indexOf(prod, 0);
    if (index > -1) {
    this.produits.splice(index, 1);
    }
    //ou Bien Methode 2
    this.produits.forEach((cur, index) => {
    if(prod.idProduit === cur.idProduit) {
    this.produits.splice(index, 1);
    }
    });
  }*/

  supprimerProduit(id: number) {
    const url = `${apiURL}/delprod/${id}`;
    return this.http.delete(url);
  }

  // consulterProduit(id:number): Produit{
  //   this.produit = this.produits.find(p => p.idProduit == id)!;
  //   return this.produit;
  // }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/getbyid/${id}`;
    return this.http.get<Produit>(url);
  }

  // updateProduit( prod: Produit){
  //   //chercher le produit prod du tableau produits
  //   const index = this.produits.indexOf(prod, 0);
  //   if (index > -1) {
  //     this.produits.splice(index, 1); //supprimer l'ancien éléments
  //     this.produits.splice(index,0,prod); // insérer le nouvel élément
  //   }
  // }

  updateProduit(prod: Produit): Observable<Produit> {
    const url = `${apiURL}/updateprod`;
    return this.http.put<Produit>(url, prod);
  }

  // listeCategories():Categorie[] {
  //   return this.categories;
  // }

  //API REST Personnelle
  listeCategories(): Observable<Categorie[]> {
    const url = `${apiURL}/cat`;
    return this.http.get<Categorie[]>(url);
  }

  //API Spring Data REST
  // listeCategories():Observable<CategorieWrapper>{
  //   return this.http.get<CategorieWrapper>(apiURLCat);
  // }

  // consulterCategorie(id:number): Categorie{
  //   return this.categories.find(cat => cat.idCat == id)!;
  // }

  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    const url = `${apiURL}/cat`;
    return this.http.post<Categorie>(url, cat);
  }

  addHttpHeaderToken(){
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    return new HttpHeaders({ Authorization: jwt });
  }

  uploadFichier(file: File, filename: string): Observable<Fichier> {
    const fichierFormData = new FormData();
    console.log(file);
    console.log(filename);
    fichierFormData.append('image', file, filename);
    const url = `${apiURL + '/fichier/upload'}`;
    return this.http.post<Fichier>(url, fichierFormData);
  }

  loadFichier(id: number): Observable<Fichier> {
    const url = `${apiURL + '/fichier/get/info'}/${id}`;
    return this.http.get<Fichier>(url);
  }

}
