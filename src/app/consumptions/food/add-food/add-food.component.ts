import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UIService } from 'src/app/shared/ui.service';
import { FoodItem } from '../../models/food-item.model';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {

  addFoodItemForm: FormGroup;
  foodItemName: string;
  section: string;
  foodItem: FoodItem;
  category: string;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private fb : FormBuilder,
    private uiService: UIService,
    public dialogRef: MatDialogRef<AddFoodComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
    if(this.passedData.foodItem) {
      this.foodItem = this.passedData.foodItem
      if(!this.foodItem.amount) {
        this.foodItem.amount === 0;
      }
      this.addFoodItemForm.setValue({
        id: this.foodItem.id,
        // section: new FormControl(this.section),
        // category: new FormControl(this.foodItem.category, Validators.required),
        nameDutch: this.foodItem.nameDutch,
        nameEnglish: this.foodItem.nameEnglish,
        ingredientsDutch: this.foodItem.ingredientsDutch,
        ingredientsEnglish: this.foodItem.ingredientsEnglish,
        // vegetarian: new FormControl(this.foodItem.vegetarian, Validators.required),
        amount: this.foodItem.amount,
        price: this.foodItem.price,
        listPosition: this.foodItem.listPosition,
        section: null,
        vegetarian: null,
      });
    } 
  }

  initForm() {
    
      this.addFoodItemForm = this.fb.group({
        id: new FormControl(null),
        section: new FormControl(this.section),
        nameDutch: new FormControl(null, Validators.required),
        nameEnglish: new FormControl(null, Validators.required),
        ingredientsDutch: new FormControl(null),
        ingredientsEnglish: new FormControl(null),
        vegetarian: new FormControl(false),
        amount: new FormControl(0),
        price: new FormControl(0, Validators.required),
        listPosition: new FormControl(null, Validators.required),
      })
    
  }
}
