import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Image, ImageAndIndex } from '../../exhibition.model';

import { ExhibitionsService } from '../../exhibitions.service';

@Component({
    selector: 'app-add-image',
    templateUrl: './add-image.component.html',
    styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

    form: FormGroup
    filePath: string;
    imageSelected: boolean = false;
    editMode: boolean = false;
    @Output() exportImageToParent = new EventEmitter<Image>()
    @Output() closeAddImageComponent = new EventEmitter<void>()
    @Input() importImageFromParent: Image;


    constructor(
        private fb: FormBuilder,
        private exhibitionsService: ExhibitionsService
    ) { }

    ngOnInit(): void {
        this.initializeForm()
        if (this.importImageFromParent != undefined) {
            this.editMode = true;
            this.setForm()
        }
        console.log(this.editMode);
    }

    initializeForm() {
        this.form = this.fb.group({
            orderNumber: new FormControl(1, [Validators.required]),
            title: new FormControl(null, [Validators.required]),
            artistName: new FormControl(null),
            copyrightOwner: new FormControl(null),
            price: new FormControl(null)
        })
    }
    setForm() {
        this.form.setValue({
            orderNumber: this.importImageFromParent.orderNumber,
            title: this.importImageFromParent.title,
            artistName: this.importImageFromParent.artistName,
            copyrightOwner: this.importImageFromParent.copyrightOwner,
            price: this.importImageFromParent.price,
        })
        if (this.importImageFromParent.filePath) {
            this.imageSelected = true;
            this.filePath = this.importImageFromParent.filePath;
        }
    }

    onChange(e): void {
        console.log(e.target.files[0]);
        const file = e.target.files[0]
        this.exhibitionsService.addImageToBucket(file, 'tuya-street').subscribe(
            (filePath) => {
                this.filePath = filePath;
                this.imageSelected = true;
            }
        )
    }

    onCancelImage() {
        this.form.reset();
        this.filePath = null;
        this.closeAddImageComponent.emit();
        
    }
    onAddImageToExhibition() {
        const image: Image = {
            filePath: this.filePath,
            ...this.form.value
        }
        this.exportImageToParent.emit(image)
        this.form.reset();
        this.filePath = null;
    }
}
