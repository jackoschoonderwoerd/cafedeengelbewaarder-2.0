import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsumptionsService } from '../../consumptions.service';
import { DbDrink } from '../drink-item.model';
import { DrinksService } from '../drinks.service';

@Component({
  selector: 'app-add-drink',
  templateUrl: './add-drink.component.html',
  styleUrls: ['./add-drink.component.scss']
})
export class AddDrinkComponent implements OnInit {


  addDrinkForm: FormGroup;
  editMode: boolean = false;
  categories: string[];
  wineSelected: boolean = false;
  category: string = 'general';
  listPositions: number[] = []
  
  
  

  constructor(
    private fb: FormBuilder,
    private consuptionsService: ConsumptionsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    // private drinksService: DrinksService
  ) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('350px');
    for(let i = 1; i < 31; i++) {
      this.listPositions.push(i);
    }
    console.log(this.listPositions)
    console.log(this.data)
    if(this.data.drink) {
      console.log('edit')
      if(this.data.drink.wineType) {
        console.log('edit wine')
        this.category = 'wine'
      }
    } else {
      console.log('new')
      this.category = this.data.category
    }
    // if(this.data.drink.wineType !== null) {
    //   this.category = 'wine'
    // } else {
    //   this.category = this.data.category
    // }
    this.initForm()
    if(this.data.action !== 'add') {
      this.editMode = true;
      const drink: DbDrink = this.data.drink
      this.addDrinkForm.setValue({
        drinkId: drink.drinkId,
        nameDutch: drink.nameDutch,
        nameEnglish: drink.nameEnglish,
        price: drink.price,
        category: drink.category,
        listPosition: drink.listPosition,
        wineType: drink.wineType,
        wineContainer: drink.wineContainer
      })
      this.addDrinkForm.updateValueAndValidity()
    } else {
      this.editMode = false;
      this.addDrinkForm.patchValue({
        category: this.category
      })
    }
  }

  initForm() {
    // this.categories = this.drinksService.getCategories()
    this.addDrinkForm = this.fb.group({
      drinkId: new FormControl(null),
      nameDutch: new FormControl(null, Validators.required),
      nameEnglish: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      listPosition: new FormControl(null, Validators.required),
      wineType: new FormControl(),
      wineContainer: new FormControl(),
      price: new FormControl(null, Validators.required),
    })
  }
  onSelectionChange(e) {
    if(e.value === 'wine') {
      this.category = 'wine';
    } else {
      this.category = 'general';
    }
  }
}
