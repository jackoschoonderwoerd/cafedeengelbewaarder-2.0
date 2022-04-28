import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Exhibition, Image } from 'src/app/exhibitions/exhibition.model';
import { NewExhibition } from '../new-exhibition.model';
import { NewExhibitionsService } from '../new-exhibitions.service';
import { FullSizeDialogComponent } from './full-size-dialog/full-size-dialog.component';

@Component({
    selector: 'app-show-exposition',
    templateUrl: './show-exposition.component.html',
    styleUrls: ['./show-exposition.component.scss']
})
export class ShowExpositionComponent implements OnInit {

    exhibition: NewExhibition
    exhibition$: Observable<any>
    activeImageIndex: number = 0;
    events: string[] = [];
    opened: boolean = false;
    images;
    imageIsLoaded: boolean = false
    currentImagePath: string;
    isRestoreButtons: boolean = true
    

    constructor(
        private route: ActivatedRoute,
        private newExhibitionSevice: NewExhibitionsService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {

        const exhibitionId = this.route.snapshot.paramMap.get('exhibitionId')

        this.newExhibitionSevice.getExhibitionById(exhibitionId)
        .then((exhibition: NewExhibition) => {
            this.checkImageLoaded(exhibition.images[this.activeImageIndex].filePath);    
        })
        
        this.newExhibitionSevice.getExhibitionById(exhibitionId)
            .then((exhibition: NewExhibition) => {
                this.exhibition = exhibition
                this.currentImagePath = this.exhibition.images[this.activeImageIndex].filePath;
                this.checkImageLoaded(this.currentImagePath);
            })
    }
    onClose() {
        this.opened = !this.opened;
    }
    onInfo() {
        this.opened = !this.opened;
    }
    onNext() {
        this.isRestoreButtons = true;
        this.imageIsLoaded = false;
        console.log('onNext()')
        if(this.activeImageIndex < this.exhibition.images.length - 1) {
            this.activeImageIndex +=1;
        } else {  
            this.activeImageIndex = 0;
        }
        this.currentImagePath = this.exhibition.images[this.activeImageIndex].filePath
        this.checkImageLoaded(this.currentImagePath);
        // this.restoreButtons()
    }
    
    onPrevious() {
        console.log('onPrevious()')
        if(this.activeImageIndex > 0) {
            this.activeImageIndex -=1;
        } else { 
            this.activeImageIndex = this.exhibition.images.length -1
        }
        console.log(this.activeImageIndex);
        this.currentImagePath = this.exhibition.images[this.activeImageIndex].filePath 
        this.checkImageLoaded(this.currentImagePath)
    }

    
    checkImageLoaded(src) {
        const objImagePreloader = new Image();
       
        objImagePreloader.src = src;

        objImagePreloader.onload = (data) => {
            console.log('onload', data);
            this.imageIsLoaded = true;
            // this.isRestoreButtons = false;
            // start animation
        }
    }

    onShowFullSize(filePath: string) {
        console.log(filePath);
        this.dialog.open(FullSizeDialogComponent, {
            data: {filePath},
            height: '100%',
            maxWidth:  window.innerWidth + 200 +'px',
            panelClass: 'full-size-image'
        })
    }
   
}
