import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../services/produit-service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-produits',
  imports: [CommonModule,RouterLink],
  templateUrl: './produits.html',
  styleUrl: './produits.css'
})
export class Produits implements OnInit {

  produits? : Produit[]; //un tableau de Produit
  constructor(private produitService: ProduitService, public authService: AuthService ) {}

  ngOnInit(): void {
    // this.produits = this.produitService.listeProduits();
    this.chargerProduits();
  }

  // deleteProduit(p: Produit){
  //   this.produitService.supprimerProduit(p);
  // }

  chargerProduits(){
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }

  deleteProduit(p: Produit)
  {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
      });
  }

}
