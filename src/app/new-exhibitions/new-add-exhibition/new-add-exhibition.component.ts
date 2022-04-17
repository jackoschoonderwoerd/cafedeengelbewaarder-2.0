import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { NewExhibition, NewImage } from '../new-exhibition.model';
import { NewExhibitionsService } from '../new-exhibitions.service';

@Component({
    selector: 'app-new-add-exhibition',
    templateUrl: './new-add-exhibition.component.html',
    styleUrls: ['./new-add-exhibition.component.scss']
})
export class NewAddExhibitionComponent implements OnInit {

    form: FormGroup;
    newAddImageComponentOpen: boolean = false;
    exhibition: NewExhibition;
    images: NewImage[] = []
    exportImageToChild: NewImage;
    index: number;
    editMode: boolean = false;
    editExhibitionMode: boolean = false;
    exhibitionId: string;
    tests = [1,2,3,4,5,6]
    

    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private exhibitionService: NewExhibitionsService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initForm()
        const exhibitionId = this.route.snapshot.paramMap.get('exhibitionId')
        if(exhibitionId) {
            this.exhibitionId = exhibitionId;
            this.editExhibitionMode = true;
            console.log(exhibitionId);
            console.log('edit')
            this.exhibitionService.getExhibitionById(exhibitionId)
                .then((exhibition: NewExhibition) => {
                    console.log(exhibition);
                    this.images = exhibition.images
                    this.form.patchValue({
                        title: exhibition.title,
                        startExhibition: new Date(exhibition.startExhibition),
                        endExhibition: new Date(exhibition.endExhibition),
                        // artistNames: exhibition.artistNames,
                        description: exhibition.description,
                        emailAddress: exhibition.emailAddress,
                        link: exhibition.link

                    })
                    this.setFormArtistNames(exhibition.artistNames);
                })
        } else {
            console.log('new');
        }
        if(localStorage.getItem('images')) {
            this.images = JSON.parse(localStorage.getItem('images'))
        }
        console.log(this.images)
    }
    initForm() {
        this.form = this.fb.group({
            title: new FormControl(null, [Validators.required]),
            startExhibition: new FormControl(new Date('1/1/1990')),
            endExhibition: new FormControl(new Date('1/2/1990')),
            artistNames: new FormArray([]),
            description: new FormControl(null),
            emailAddress: new FormControl(null),
            link: new FormControl(null)
        })
    }
    onAddArtistName() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.form.get('artistNames')).push(control)
    }

    setFormArtistNames(names: string[]) {
        names.forEach((name: string) => {
            const control = new FormControl(name, Validators.required);
            (<FormArray>this.form.get('artistNames')).push(control)
        })
    }

    closeAddImageComponent() {
        this.newAddImageComponentOpen = false;
    }

    openAddImageComponent() {

    }
    onAddExhibition() {
        const exhibition: NewExhibition = {
            ...this.form.value,
            startExhibition: this.form.value.startExhibition.getTime(),
            endExhibition: this.form.value.endExhibition.getTime(),
            images: this.images
        }
        if(this.editExhibitionMode) {
            this.exhibitionService.updateExhibition(this.exhibitionId, exhibition)
            .then(res => {
                console.log(res)
                this.router.navigate(['/new-exhibitions'])
            })
            .catch(err => console.log(err));
        } else {
            this.exhibitionService.addExhibitionToDb(exhibition)
            .then(res => {
                console.log(res);
                this.router.navigate(['/new-exhibitions'])
                    .then(nav => {console.log(nav)})
                    .catch(err => {console.log(err)})
            })
            .catch(err => console.log(err));
        }
        this.form.reset();
        this.images = [];
        this.updateLocalStorage()
        // console.log('onAddExhibition')
        // console.log(this.form.value)
    }



    onAddImage() {
        this.newAddImageComponentOpen = true
    }
    onEditImage(index: number) {
        // this.editMode = true;
        this.index = index;
        console.log(index);
        this.exportImageToChild = this.images[index];
        this.newAddImageComponentOpen = true;
    }
    onDeleteImage(index) {
        const dialogRef = this.dialog.open(ConfirmDeleteComponent);
        dialogRef.afterClosed().subscribe((res) => {
            if(res) {
                this.images.splice(index, 1);this.updateLocalStorage();
            }
        })
    }

    importImageFromChild(image: NewImage) {
        console.log(this.index)
        if(this.index >= 0) {
            this.images[this.index] = image
            console.log('edit')
        } else {
            console.log('add');
            this.images.push(image)
        } 
        this.images = this.images.sort((a, b) => a.orderNumber - b.orderNumber);
        localStorage.setItem('images', JSON.stringify(this.images))
        this.newAddImageComponentOpen = false
        this.index = undefined;
        
    }

    onCancelAddingOrEditingExhibition() {
        this.form.reset();
        this.router.navigate(['/new-exhibitions'])
    }
    onDeleteExhibition() {
        // TODO
    }
    

    updateLocalStorage() {
        localStorage.setItem('images', JSON.stringify(this.images))
    }
}
