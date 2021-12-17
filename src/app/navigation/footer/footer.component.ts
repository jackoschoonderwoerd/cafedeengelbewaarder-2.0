import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OpeningHours } from 'src/app/shared/opening-hours.model';
import * as fromApp from './../../app.reducer'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private store: Store<fromApp.GlobalState>
  ) { }

  language: string = 'dutch';
  openingHours: OpeningHours;

  ngOnInit(): void {
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language;
    });
    this.store.select(fromApp.getOpeningHours).subscribe((openingHours: OpeningHours) => {
      this.openingHours = openingHours
    })
  }

}
