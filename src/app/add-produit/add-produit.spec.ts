import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProduit } from './add-produit';

describe('AddProduit', () => {
  let component: AddProduit;
  let fixture: ComponentFixture<AddProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProduit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProduit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
