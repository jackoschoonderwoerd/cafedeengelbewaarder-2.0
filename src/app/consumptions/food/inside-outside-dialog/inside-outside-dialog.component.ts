import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../app.reducer';
import * as UI from './../../../../app/shared/ui.actions';

@Component({
    selector: 'app-inside-outside-dialog',
    templateUrl: './inside-outside-dialog.component.html',
    styleUrls: ['./inside-outside-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InsideOutsideDialogComponent implements OnInit {

    language: string = 'dutch'

    constructor(
        private store: Store<fromApp.GlobalState>
    ) { }

    ngOnInit(): void {
        this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
            this.language = language
        })
    }
    onFlag(language: string) {
        this.store.dispatch(new UI.SelectedLanguage(language))
    }

}
