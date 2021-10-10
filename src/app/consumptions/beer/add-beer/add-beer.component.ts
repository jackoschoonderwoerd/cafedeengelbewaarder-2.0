import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons'
import { faWineGlass } from '@fortawesome/free-solid-svg-icons'
import { Beer } from '../beer.model';



@Component({
  selector: 'app-add-beer',
  templateUrl: './add-beer.component.html',
  styleUrls: ['./add-beer.component.scss']
})
export class AddBeerComponent implements OnInit {

  faWineBottle = faWineBottle;
  faWineGlass = faWineGlass

  addBeerForm: FormGroup
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.initForm()
    if(this.data) {
      const beer: Beer = this.data.beer
      this.editMode = true
      this.addBeerForm.setValue({
        id: beer.id,
        name: beer.name,
        draught: beer.draught,
        price: beer.price,
        content: beer.content,
        percentage: beer.percentage,
        listPosition: beer.listPosition,
        descriptionDutch: beer.descriptionDutch,
        descriptionEnglish: beer.descriptionEnglish
      });
    }  
  }
  
  initForm() {
    this.addBeerForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      draught: new FormControl(true),
      price: new FormControl(1, Validators.required),
      content: new FormControl(1, Validators.required),
      percentage: new FormControl(5, Validators.required),
      listPosition: new FormControl(1, Validators.required),
      descriptionDutch: new FormControl(null, Validators.required),
      descriptionEnglish: new FormControl(null, Validators.required),   
    })
  }
}
