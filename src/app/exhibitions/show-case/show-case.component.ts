import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Exhibition } from '../exhibition.model';

import { ExhibitionsService } from '../exhibitions.service';
import { Photo } from '../photo.model';
import * as fromApp from './../../app.reducer';
import * as UI from './../../shared/ui.actions'

import { Slide } from '../slide.model';
import { ViewportScroller } from '@angular/common';





@Component({
  selector: 'app-show-case',
  templateUrl: './show-case.component.html',
  styleUrls: ['./show-case.component.scss']
})
export class ShowCaseComponent implements OnInit, OnDestroy, AfterViewInit {



  images = []
  exhibitionId: string;
  exhibition: Exhibition
  // expositionId: string = '';

  expositionDescription: string = '';
  // imgPaths: string[] = [];
  // imgPath: string;
  htmlContent: string;
  mainPhoto: Photo
  additionalPhotos: Photo[];
  aspectRatio: number = 66;
  hideArrows: boolean = true;
  pageYoffset: number;

 


  constructor(
    private store: Store<fromApp.GlobalState>,
    private exhibitionService: ExhibitionsService,
    private router: Router,



    // private expositionService: ExpositionsService
  ) { }

  ngOnInit(): void {



    this.store.dispatch(new UI.ShowcaseActive(true));
    this.store.subscribe(storeContent => {
      if (storeContent.exposition.exhibitionId) {
        this.exhibition = this.exhibitionService.getExhibition(storeContent.exposition.exhibitionId);
        if(this.exhibition === undefined) {
          this.router.navigate(['/exhibitions']);
          return;
        }
        this.images = [];
        if (this.exhibition.aspectRatio) {
          this.aspectRatio = this.exhibition.aspectRatio
        }
        if (this.exhibition.slides.length > 1) {
          this.hideArrows = false
        }
        this.exhibition.slides.forEach((slide: Slide) => {
          this.images.push({
            'image': slide.imagePath,
            caption: slide.caption,
            price: slide.price,
            copyright: slide.copyright
          })
        })
        // this.slides = this.exhibition.slides;
      }
      fetch(this.exhibition.descriptionPath)
        .then(response => {
          return response.text()
        })
        .then((htmlContent: string) => {
          this.htmlContent = htmlContent
        })
    });


  }
  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }


  ngOnDestroy() {
    this.images = [];
    this.store.dispatch(new UI.ShowcaseActive(false));
  }
}
