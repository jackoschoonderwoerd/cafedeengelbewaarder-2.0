import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-full-size-dialog',
  templateUrl: './full-size-dialog.component.html',
  styleUrls: ['./full-size-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FullSizeDialogComponent implements OnInit {

  filePath: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FullSizeDialogComponent>
    ) { 

  }

  ngOnInit(): void {
    console.log(this.data)
    this.filePath = this.data.filePath
  }
  onClose() {
    console.log('close')
    this.dialogRef.close()
  }
}
