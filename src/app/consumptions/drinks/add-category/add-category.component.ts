import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrinkCategory } from '../drink.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup;
  category: any;
  editMode: boolean = false

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm()
    if(this.data) {
      this.category = this.data.category
      console.log(this.category.nameDutch);
      this.editMode = true;
      this.form.patchValue({
        nameDutch: this.category.nameDutch,
        nameEnglish: this.category.nameEnglish, 
        listPosition: this.category.listPosition,
      });
    }
  }

  initForm() {  
    this.form = this.fb.group({
      nameDutch: new FormControl(null, Validators.required),
      nameEnglish: new FormControl(null, Validators.required),
      listPosition: new FormControl(null, Validators.required)
    })
  }

}
