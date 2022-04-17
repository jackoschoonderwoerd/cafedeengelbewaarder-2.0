import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exhibition } from '../exhibitions/exhibition.model';
import { NewExhibitionsService } from './new-exhibitions.service';
import * as fromRoot from './../app.reducer'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';

@Component({
    selector: 'app-new-exhibitions',
    templateUrl: './new-exhibitions.component.html',
    styleUrls: ['./new-exhibitions.component.scss']
})
export class NewExhibitionsComponent implements OnInit {

    isAuthenticated$: Observable<boolean>

    constructor(
        private store: Store<fromRoot.GlobalState>,
        private newExhibitionsService: NewExhibitionsService,
        private router: Router,
        private dialog: MatDialog
    ) { }

    exhibitions$: Observable<Exhibition[]>

    ngOnInit(): void {
        this.exhibitions$ = this.newExhibitionsService.getExhibitions();
        this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
        
    }
    onAddExhibition() {
        this.router.navigate(['new-exhibitions/new-add-exhibition']);
    }
    onShowExhibition(exhibitionId) {
        this.router.navigate(['/new-exhibitions/show-exhibition', {exhibitionId}]);
    }
    onEditExhibition(exhibitionId) {
        this.router.navigate(['/new-exhibitions/new-add-exhibition', {exhibitionId}]);
    }
    onDeleteExhibition(exhibitionId: string) {
        const dialogRef = this.dialog.open(ConfirmDeleteComponent)
        dialogRef.afterClosed().subscribe((res) => {
            if(res) {
                this.newExhibitionsService.deleteExhibition(exhibitionId)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            }
        })
    }
}
