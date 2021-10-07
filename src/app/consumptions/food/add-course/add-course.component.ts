import { Component, Inject, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../models/food-item.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  form: FormGroup
  mealType: string;
  mealTypeId: string;
  courseName: string
  course: Course
  // showCourseName: boolean = true;
  editMode: boolean = false
  

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.initForm()
    console.log(this.data);
    if(this.data.course) {
      this.editMode = true;
      this.course = this.data.course
      this.form.setValue({
        id: this.course.id,
        nameDutch: this.course.nameDutch,
        nameEnglish: this.course.nameEnglish,
        showCourseName: this.course.showCourseName,
        listPosition: this.course.listPosition,
        remarkDutch: this.course.remarkDutch,
        remarkEnglish: this.course.remarkEnglish,
        foodItems: this.course.foodItems
      })
    } else {
      console.log('new')
      this.mealType = this.data.mealType;
      // this.showCourseName = true;
      this.form.patchValue({
        showCourseName: 'true'
      })
      // this.form.updateValueAndValidity()
    }
  }
  initForm() {
    this.form = this.fb.group({
      id: new FormControl(this.mealTypeId, Validators.required),
      nameDutch: new FormControl(null, Validators.required),
      nameEnglish: new FormControl(null, Validators.required),
      showCourseName: new FormControl(null),
      listPosition: new FormControl(null),
      remarkDutch: new FormControl(null),
      remarkEnglish: new FormControl(null),
      foodItems: new FormControl(null)
    })
  }
}
