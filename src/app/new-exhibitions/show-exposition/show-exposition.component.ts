import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Exhibition } from 'src/app/exhibitions/exhibition.model';
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
    name = 'Angular';
    events: string[] = [];
    opened: boolean = false;
    images

//   shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

    constructor(
        private route: ActivatedRoute,
        private newExhibitionSevice: NewExhibitionsService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        const exhibitionId = this.route.snapshot.paramMap.get('exhibitionId')

        // this.newExhibitionSevice.getFilePathsByExhibitionId(exhibitionId)
        //     .subscribe((exhibition) => {console.log(exhibition)});
        this.newExhibitionSevice.getExhibitionById(exhibitionId)
        .then((exhibition: NewExhibition) => {
            
        })
        
        this.newExhibitionSevice.getExhibitionById(exhibitionId)
            .then((exhibition: NewExhibition) => {
                this.exhibition = exhibition
            })
        this.exhibition$ = this.newExhibitionSevice.getExhibitionByIdAsObservable(exhibitionId)
    }
    onClose() {
        this.opened = !this.opened;
    }
    onInfo() {
        this.opened = !this.opened;
    }
    onNext() {
        console.log('onNext()')
        if(this.activeImageIndex < this.exhibition.images.length - 1) {
            this.activeImageIndex +=1;
        } else {
           
            this.activeImageIndex = 0;
        }
        console.log(this.activeImageIndex);
    }

    onPrevious() {
        console.log('onPrevious()')
        if(this.activeImageIndex > 0) {
            this.activeImageIndex -=1;
        } else { 
            this.activeImageIndex = this.exhibition.images.length -1
        }
        console.log(this.activeImageIndex);
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
