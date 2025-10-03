import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { ProduitService } from '../services/produit-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-par-categorie',
  imports: [CommonModule,FormsModule],
  templateUrl: './recherche-par-categorie.html',
  styles: ``,
})
export class RechercheParCategorie implements OnInit {

  produits!: Produit[];
  IdCategorie!: number;
  categories!: Categorie[];

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe((cats) => {
      this.categories = cats;
      console.log(cats);
    });
  }

  onChange() {
    this.produitService.rechercherParCategorie(this.IdCategorie).subscribe((prods) => {
      this.produits = prods;
    });
  }
}
