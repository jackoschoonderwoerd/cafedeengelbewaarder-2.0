import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { UIService } from '../shared/ui.service';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsumptionsService {

  categories: string[] = [
    'coffee and tea',
    'soft drinks',
    'wine',
    'dutch spirits',
    'foreign spirits'
  ]
  

  constructor(
    private db: AngularFirestore,
    private uiService: UIService
  ) { }
}

