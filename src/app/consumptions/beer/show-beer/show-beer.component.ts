import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from '../beer.model';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-beer',
  templateUrl: './show-beer.component.html',
  styleUrls: ['./show-beer.component.scss']
})
export class ShowBeerComponent implements OnInit {

  beer: Beer;
  faChevronLeft =  faChevronLeft
  faWindowClose = faWindowClose
  language: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private store: Store<fromApp.GlobalState>
  ) { }

  ngOnInit(): void {
    this.beer = this.data.beer
    console.log(this.beer);
    this.store
      .select(fromApp.getSelectedLanguage)
      .subscribe((language: string) => {
        this.language = language
      })
  }
}
