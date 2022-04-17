import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { Exhibition, Image, ImageAndIndex } from '../exhibition.model';
import { ExhibitionsService } from '../exhibitions.service';

@Component({
    selector: 'app-add-exhibition',
    templateUrl: './add-exhibition.component.html',
    styleUrls: ['./add-exhibition.component.scss']
})
export class AddExhibitionComponent implements OnInit {

    exhibitionForm: FormGroup;
    // imageForm: FormGroup;
    // slideForm: FormGroup
    // imageFilePath: string;
    // imageFilePaths: string[] = [];
    exhibition: Exhibition = {
        title: '',
        startExhibition: null,
        endExhibition : null,
        artistNames: [] = [],
        description: null,
        images: [] = []
    };
    preview: string;
    // imageEditMode: boolean = false;
    imageComponentOpen: boolean = false;
    exportImageToChild: Image;
    indexEditedImage: number



    constructor(
        private fb: FormBuilder,
        private exhibitionsService: ExhibitionsService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        if(localStorage.getItem('exhibition')) {
            this.exhibition = JSON.parse(localStorage.getItem('exhibition'))
        }
        console.log(this.exhibition);
        this.initializeExhibitionForm();
        console.log(this.indexEditedImage);
    }
    initializeExhibitionForm() {
        this.exhibitionForm = this.fb.group({
            title: new FormControl(null, [Validators.required]),
            startExhibition: new FormControl(null),
            endExhibition: new FormControl(null),
            artistNames: new FormArray([]),
            description: new FormControl()
        })
    }

    onAddExhibition() {
        console.log(this.exhibitionForm.value)
        const exhibition: Exhibition = {
            title: this.exhibitionForm.value.title,
            artistNames: this.exhibitionForm.value.artistNames,
            startExhibition: this.exhibitionForm.value.startExhibition.getTime(),
            endExhibition: this.exhibitionForm.value.endExhibition.getTime(),
            description: this.exhibitionForm.value.description,
            images: this.exhibition.images
        }
        this.exhibitionsService.addExhibitionToDb(exhibition)
            .then(res => {console.log(res)})
            .catch(err => console.log(err));
            localStorage.removeItem('exhibition')
    }
    
    onAddArtistName() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.exhibitionForm.get('artistNames')).push(control)
    }

    openAddImageComponent() {
        this.imageComponentOpen = true;
    }

    onEditImage(index) {
        this.indexEditedImage = index
        this.imageComponentOpen = true;
        const image: Image = this.exhibition.images[index]
        console.log(image)
        this.exportImageToChild = image;
        
    }
    onDeleteImage(index) {
        const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: {
                message: 'are you sure'
            }
        });
        dialogRef.afterClosed().subscribe(res => {
            if(res) {
                this.exhibition.images.splice(index, 1)
                this.imageComponentOpen = false;
                this.updateLocalStorage()
            }
        })
    }
    closeAddImageComponent() {
        this.imageComponentOpen = false;
        this.exportImageToChild = null;
        this.indexEditedImage = undefined;

    }
    importImageFromChild(event) {
        this.imageComponentOpen = false
        if(this.indexEditedImage != undefined) {
            console.log('replacing')
            this.exhibition.images[this.indexEditedImage] = event
        } else {
            console.log('adding')
            this.exhibition.images.push(event)
        }
        this.indexEditedImage = undefined;
        console.log(this.exhibition.images);
        this.exhibition.images.sort((a,b) => {
            return a.orderNumber - b.orderNumber;
        })
        this.updateLocalStorage()
    }
    private updateLocalStorage() {
        localStorage.setItem('exhibition', JSON.stringify(this.exhibition));
    }
}
