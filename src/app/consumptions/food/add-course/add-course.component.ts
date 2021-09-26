import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  form: FormGroup
  mealTypeName: string;
  mealTypeId: string

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit(): void {
    
    this.mealTypeName = this.data.mealTypeName,
    this.mealTypeId = this.data.mealTypeId
    this.initForm()
  }
  initForm() {
    this.form = this.fb.group({
      id: new FormControl(this.mealTypeId, Validators.required),
      name: new FormControl('new course', Validators.required)
    })
  }

}
