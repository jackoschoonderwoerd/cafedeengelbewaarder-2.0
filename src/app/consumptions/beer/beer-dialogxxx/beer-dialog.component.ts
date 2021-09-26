import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog'
import { Store } from '@ngrx/store';

import { BeerService } from '../beer.service';
import * as fromApp from './../../../app.reducer'




@Component({
  selector: 'app-beer-dialog',
  templateUrl: './beer-dialog.component.html',
  styleUrls: ['./beer-dialog.component.css']
})
export class BeerDialogComponent implements OnInit {

  beerName: string = '';
  descriptionFileName: string = '';
  beerDescriptions: string = '';
  beerContentDutch: string = '';
  beerContentEnglish: string = '';
  htmlStr: string = 'Plain Text Example &amp; <strong>Bold Text Example</strong>';
  language: string = 'dutch';
  htmlContent: string = '<p>Beschrijving niet beschikbaar.</p>'

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<BeerDialogComponent>,
    private store: Store<fromApp.GlobalState>,
    private beerService: BeerService) { }



  ngOnInit(): void {

    this.beerName = this.data.beerItem.name;
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language;
      
      fetch(`./assets/beer-descriptions/${this.createDescriptionFileName(this.beerName, language)}`)
        .then(response => {
          return response.text()
        })
        .then(text => {
          if(text.includes('<!DOCTYPE html>')) {
            if(language === 'english') {
              this.htmlContent = '<p>Description not available</p>'
            }
          } else {
            this.htmlContent = text;
          }
        })
        .catch(err => {
          this.htmlContent = 'NA'
        });
    })

    this.beerContentDutch = this.data.beerItem.descriptionDutch;
    this.beerContentEnglish = this.data.beerItem.descriptionEnglish;
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language;
    })
  }
  onClose() {
    window.close();
    this.dialogRef.close();
  }
  createDescriptionFileName(beerName: string, language: string) {
    return  beerName.toLowerCase().replace(/ /g, '-') + '-' + `${language}` + '.html';
  }
}
