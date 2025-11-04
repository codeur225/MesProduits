import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit-service';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Fichier } from '../model/Fichier.model';

@Component({
  selector: 'app-update-produit',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-produit.html',
  styles: ``,
})
export class UpdateProduit implements OnInit {
  currentProduit = new Produit();

  categories!: Categorie[];
  updatedCatId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    // this.categories = this.produitService.listeCategories();
    this.produitService.listeCategories().subscribe((cats) => {
      this.categories = cats;
      console.log(cats);
    });
    this.produitService
      .consulterProduit(this.activatedRoute.snapshot.params['id'])
      .subscribe((prod) => {
        this.currentProduit = prod;
        this.updatedCatId = this.currentProduit.categorie.idCat!;

        this.produitService
          .loadFichier(this.currentProduit.fichier.idFichier)
          .subscribe((img: Fichier) => {
            this.myImage = 'data:' + img.type + ';base64,' + img.image;
          });
      });
  }

  // updateProduit(){
  //   // this.currentProduit.categorie=this.produitService.consulterCategorie(this.updatedCatId);
  //   this.produitService.updateProduit(this.currentProduit);
  //   this.router.navigate(['produits']);
  // }

  /*updateProduit() {
    this.currentProduit.categorie = this.categories.find((cat) => cat.idCat == this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe((prod) => {
      this.router.navigate(['produits']);
    });
  }*/

  updateProduit() {
    this.currentProduit.categorie = this.categories.find((cat) => cat.idCat == this.updatedCatId)!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.produitService
        .uploadFichier(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Fichier) => {
          this.currentProduit.fichier = img;
          this.produitService.updateProduit(this.currentProduit).subscribe((prod) => {
            this.router.navigate(['produits']);
          });
        });
    } else {
      this.produitService.updateProduit(this.currentProduit).subscribe((prod) => {
        this.router.navigate(['produits']);
      });
    }
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
}
