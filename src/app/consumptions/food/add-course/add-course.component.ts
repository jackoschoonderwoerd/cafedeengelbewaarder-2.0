import { Component, Inject, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  form: FormGroup
  mealType: string;
  mealTypeId: string;
  editMode: boolean = false;
  courseName: string

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.courseId) {
      this.editMode = true;
      this.form = this.fb.group({
        nameDutch: new FormControl(this.data.courseNameDutch),
        nameEnglish: new FormControl(this.data.courseNameEnglish),
        listPosition: new FormControl(this.data.listPosition),
        remarkDutch: new FormControl(this.data.remarkDutch),
        remarkEnglish: new FormControl(this.data.remarkEnglish)
      })
    } else {
      this.mealType = this.data.mealType,
      this.mealTypeId = this.data.mealTypeId
      this.initForm()
    }
  }
  initForm() {
    this.form = this.fb.group({
      id: new FormControl(this.mealTypeId, Validators.required),
      nameDutch: new FormControl(null, Validators.required),
      nameEnglish: new FormControl(null, Validators.required),
      listPosition: new FormControl(null, Validators.required),
      remarkDutch: new FormControl(null),
      remarkEnglish: new FormControl(null)
    })
  }
}
