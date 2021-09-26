import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

import { ExhibitionsService } from './exhibitions.service';
import * as EXPOSITION from './exhibitions.actions'

import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { Exhibition } from './exhibition.model';


@Component({
  selector: 'app-expositions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss']
})


export class ExhibitionsComponent implements OnInit, AfterViewInit {




  faCoffee = faCoffee;
  language: string = 'dutch';
  expositions: Exhibition[] = [];


  constructor(
    private store: Store<fromApp.GlobalState>,
    private exhibitionsService: ExhibitionsService,
    private router: Router,


  ) { }

  ngOnInit(): void {
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language;
    });
    this.expositions = this.exhibitionsService.getExhibitions();
  }

  onExposition(id) {
    // this.store.dispatch
    // this.store.dispatch(new EXPOSITION.SetExposition(id));
    this.store.dispatch(new EXPOSITION.SetExhibitionId(id));
    this.router.navigate(['/exhibitions/showcase']);
  }
  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

}
