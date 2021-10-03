import { Component, HostListener, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { Store } from '@ngrx/store'
import * as fromRoot from './app.reducer';
import { AuthService } from './auth/auth.service';
import * as UI from './shared/ui.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cafedeengelbewaarder';
  isOpened: boolean = true;


  constructor(
    private store: Store<fromRoot.GlobalState>,
    private authService: AuthService,
    private swUpdate: SwUpdate

  ) { }

  ngOnInit() {
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
  // onActivate(event) {
  //   console.log(event)
  //   // window.scroll(0,0);
  //   // document.body.scrollTop = 0
  //   document.querySelector('body').scrollTo(0,0)
  // }

}

