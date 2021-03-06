import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';

import { Store } from '@ngrx/store'
import * as fromRoot from './app.reducer';
import { AuthService } from './auth/auth.service';
import { CoronaDialogComponent } from './corona-dialog/corona-dialog.component';
import { Exhibition } from './exhibitions/exhibition.model';
import { NewImage } from './new-exhibitions/new-exhibition.model';
import { NewExhibitionsService } from './new-exhibitions/new-exhibitions.service';
import * as UI from './shared/ui.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'cafedeengelbewaarder';
    isOpened: boolean = true;
    // loaded: number = 0;
    isNotScrolling: boolean = false

   

    constructor(
        private store: Store<fromRoot.GlobalState>,
        private authService: AuthService,
        private swUpdate: SwUpdate,
        private dialog: MatDialog,
        private newEhibitionsService: NewExhibitionsService
    ) { }

    ngOnInit() {
        const imagePaths: string[] = [];

        // this.dialog.open(CoronaDialogComponent, {
        //     minWidth: '350px',
        //     panelClass: 'kingsday',
        //     height: '535px'
        // })




        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                if (confirm('New version available. Load new version?')) {
                    window.location.reload();
                }
            });
        }

        this.store.select(fromRoot.getIsSidenavOpen).subscribe((isOpened: boolean) => {
            this.isOpened = isOpened;
        })
        this.authService.initAuthListener();

    }
    closed() {
        this.store.dispatch(new UI.CloseSidenav);
    }
}

