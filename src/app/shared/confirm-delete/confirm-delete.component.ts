import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('300px')
  }

}
