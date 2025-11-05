import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit-service';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';
import { Fichier } from '../model/Fichier.model';

@Component({
  selector: 'app-add-produit',
  imports: [FormsModule],
  templateUrl: './add-produit.html',
  styleUrl: './add-produit.css',
})
export class AddProduit implements OnInit {
  newProduit = new Produit();

  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  uploadedFichier!: File;
  fichierPath: any;

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    // this.categories = this.produitService.listeCategories();
    this.produitService.listeCategories().subscribe((cats) => {
      this.categories = cats;
      console.log(cats);
    });
  }

  // addProduit(){
  //   // this.newCategorie = this.produitService.consulterCategorie(this.newIdCat);
  //   this.newProduit.categorie = this.newCategorie;
  //   this.produitService.ajouterProduit(this.newProduit);
  //   this.newProduit = new Produit();
  //   this.router.navigate(['produits']);
  // }

  /*addProduit(){
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit)
    .subscribe(prod => {
      console.log(prod);
      this.router.navigate(['produits']);
    });
  }*/

  /* addProduit() {
    this.produitService
      .uploadFichier(this.uploadedFichier, this.uploadedFichier.name)
      .subscribe((img: Fichier) => {
        this.newProduit.fichier = img;
        this.newProduit.categorie = this.categories.find((cat) => cat.idCat == this.newIdCat)!;
        this.produitService.ajouterProduit(this.newProduit).subscribe(() => {
          this.router.navigate(['produits']);
        });
      });
  }*/

  addProduit() {
    this.newProduit.categorie = this.categories.find((cat) => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit).subscribe((prod) => {
      this.produitService
        .uploadImageFS(this.uploadedFichier, this.uploadedFichier.name, prod.idProduit)
        .subscribe((response: any) => {});
      this.router.navigate(['produits']);
    });
  }

  onFichierUpload(event: any) {
    this.uploadedFichier = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedFichier);
    reader.onload = (_event) => {
      this.fichierPath = reader.result;
    };
  }
}
