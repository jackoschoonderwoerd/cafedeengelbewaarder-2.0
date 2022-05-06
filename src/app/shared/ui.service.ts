import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  insideOutside = new EventEmitter<string>();

  constructor(private snackbar: MatSnackBar) {}


  

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
  addingFailed(itemName: string) {
    this.snackbar.open(`Adding "${itemName}" failed`, null, {
      duration: 5000,
      panelClass: 'panelClassFailure'
    })
  }
  addingSucceeded(itemName: string) {
    this.snackbar.open(`Adding "${itemName}" succeeded`, null, {
      duration: 5000,
      panelClass: 'panelClassSuccess'
    })
  }
  editingFailed(itemName: string) {
    this.snackbar.open(`Editing "${itemName}" failed`, null, {
      duration: 5000,
      panelClass: 'panelClassFailure'
    })
  }
  editingSucceeded(itemName: string) {
    this.snackbar.open(`Editing "${itemName}" succeeded`, null, {
      duration: 5000,
      panelClass: 'panelClassSuccess'
    })
  }
  deletingFailed(itemName: string) {
    this.snackbar.open(`Deletin "${itemName}" failed`, null, {
      duration: 5000,
      panelClass: 'panelClassFailure'
    })
  }
  deletingSucceeded(itemName: string) {
    this.snackbar.open(`Deleting "${itemName}" succeeded`, null, {
      duration: 5000,
      panelClass: 'panelClassSuccess'
    })
  }
}
