import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { ProduitService } from '../services/produit-service';
import { UpdateCategorie } from '../update-categorie/update-categorie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-categories',
  imports: [UpdateCategorie, CommonModule],
  templateUrl: './liste-categories.html',
  styles: ``,
})
export class ListeCategories implements OnInit {
  categories!: Categorie[];

  updatedCat: Categorie = { nomCat: '', descriptionCat: '' };

  ajout:boolean=true;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.chargerCategories();
  }

  categorieUpdated(cat: Categorie) {
    console.log('Cat updated event', cat);
    this.produitService.ajouterCategorie(cat).subscribe(() => this.chargerCategories());
  }

  chargerCategories() {
    this.produitService.listeCategories().subscribe((cats) => {
      this.categories = cats;
      console.log(cats);
    });
  }

  updateCat(cat: Categorie) {
    this.updatedCat = cat;
    this.ajout=false;
  }

}
