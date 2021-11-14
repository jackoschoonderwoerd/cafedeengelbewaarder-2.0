import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../app.reducer';
import * as UI from './../shared/ui.actions';

@Component({
  selector: 'app-corona-dialog',
  templateUrl: './corona-dialog.component.html',
  styleUrls: ['./corona-dialog.component.scss'],
})
export class CoronaDialogComponent implements OnInit {

  language: string = 'dutch'

  constructor(
    private store: Store<fromRoot.GlobalState>
  ) { }

  ngOnInit(): void {
    this.store.select(fromRoot.getSelectedLanguage).subscribe((language: string) => {
      this.language = language;
    })
  }
  onSelectLanguage(language) {
    this.store.dispatch(new UI.SelectedLanguage(language))
  }
}
