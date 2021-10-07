import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsumptionsService } from '../../consumptions.service';
import { Drink } from '../drink.model';


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
  categoryName: string;
  listPositions: number[] = []
  drink: Drink;
  
  
  

  constructor(
    private fb: FormBuilder,
    private consuptionsService: ConsumptionsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    // private drinksService: DrinksService
  ) { }

  ngOnInit(): void {
    
    this.initForm()
    this.updateDialogSize()
    if(this.data.drink) {
      console.log(this.data);
      this.categoryName = this.data.category.nameEnglish
      this.editMode = true
      this.drink = this.data.drink;
      console.log(this.drink)
      this.addDrinkForm.setValue({
        id: this.drink.id,
        nameDutch: this.drink.nameDutch,
        nameEnglish: this.drink.nameEnglish,
        listPosition: this.drink.listPosition,
        wineType: this.categoryName === 'wine' ? this.drink.wineType : null,
        wineContainer: this.categoryName === 'wine' ? this.drink.wineContainer : null,
        price: this.drink.price
      })
    } else {
      this.categoryName = this.data.categoryName
      console.log(this.categoryName);
    }
  }
  private updateDialogSize() {
    this.dialogRef.updateSize('100%', '95%')
  }

  initForm() {
    // this.categories = this.drinksService.getCategories()
    this.addDrinkForm = this.fb.group({
      id: new FormControl(null),
      nameDutch: new FormControl(null, Validators.required),
      nameEnglish: new FormControl(null, Validators.required),
      listPosition: new FormControl(null, Validators.required),
      wineType: new FormControl(null),
      wineContainer: new FormControl(null),
      price: new FormControl(null, Validators.required),
    })
  }
  // onSelectionChange(e) {
  //   if(e.value === 'wine') {
  //     this.category = 'wine';
  //   } else {
  //     this.category = 'general';
  //   }
  // }
}
