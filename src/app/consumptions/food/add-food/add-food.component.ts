import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UIService } from 'src/app/shared/ui.service';
import { FoodItem, NewFoodItem } from '../../models/food-item.model';

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
    console.log(this.passedData)
    this.foodItem = this.passedData.foodItem
    console.log(this.foodItem);
    if(this.passedData.foodItem) {
      this.foodItem = this.passedData.foodItem
      console.log('edit')
      this.addFoodItemForm = this.fb.group({
        
        id: new FormControl(this.foodItem.id),
        // section: new FormControl(this.section),
        // category: new FormControl(this.foodItem.category, Validators.required),
        nameDutch: new FormControl(this.foodItem.nameDutch, Validators.required),
        // nameEnglish: new FormControl(this.foodItem.nameEnglish, Validators.required),
        ingredientsDutch: new FormControl(this.foodItem.ingredientsDutch),
        // ingredientsEnglish: new FormControl(this.foodItem.ingredientsEnglish),
        // vegetarian: new FormControl(this.foodItem.vegetarian, Validators.required),
        // amount: new FormControl(this.foodItem.amount),
        price: new FormControl(this.foodItem.price, Validators.required),
        // listPosition: new FormControl(this.foodItem.listPosition, Validators.required)
      });
    } else {
      console.log('new')
      this.initForm()
    }
    // this.foodItemName = this.data.name;
    // this.section = this.data.section;
    console.log(this.passedData)
  }
  initForm() {
    if(this.passedData.courseName) {
      console.log(this.passedData.courseName);
      this.addFoodItemForm = this.fb.group({
        id: new FormControl(null),
        section: new FormControl(this.section),
        category: new FormControl(this.passedData.courseName, Validators.required),
        nameDutch: new FormControl('null', Validators.required),
        nameEnglish: new FormControl('null', Validators.required),
        ingredientsDutch: new FormControl('null'),
        ingredientsEnglish: new FormControl('null'),
        vegetarian: new FormControl(false, Validators.required),
        amount: new FormControl(1),
        price: new FormControl(1, Validators.required),
        listPosition: new FormControl(1, Validators.required)
      })
    } 
  }
  // onSubmit() {
  //   console.log(this.addFoodItemForm.value);
  // }
}
