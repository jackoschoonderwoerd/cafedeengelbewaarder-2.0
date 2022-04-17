
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewImage } from './../../new-exhibition.model';
import { NewExhibitionsService } from '../../new-exhibitions.service';

@Component({
    selector: 'app-new-add-image',
    templateUrl: './new-add-image.component.html',
    styleUrls: ['./new-add-image.component.scss']
})
export class NewAddImageComponent implements OnInit {

    form: FormGroup
    filePath: string;
    imageSelected: boolean = false;
    editMode: boolean = false;
    @Output() exportImageToParent = new EventEmitter<NewImage>()
    @Output() closeAddImageComponent = new EventEmitter<void>()
    @Input() importImageFromParent: NewImage;

    constructor(
        private fb: FormBuilder,
        private newExhibitionsService: NewExhibitionsService
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
            orderNumber: new FormControl(null, [Validators.required]),
            title: new FormControl(null),
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
        this.newExhibitionsService.addImageToBucket(file, 'tuya-street').subscribe(
            (filePath) => {
                this.filePath = filePath;
                this.imageSelected = true;
            }
        )
    }

    onCancelImage() {
        console.log('cancelling')
        this.form.reset();
        this.filePath = null;
        this.closeAddImageComponent.emit();

    }
    onAddImageToExhibition() {
        const image: NewImage = {
            filePath: this.filePath,
            ...this.form.value
        }
        this.exportImageToParent.emit(image)
        this.form.reset();
        this.filePath = null;
    }
}
