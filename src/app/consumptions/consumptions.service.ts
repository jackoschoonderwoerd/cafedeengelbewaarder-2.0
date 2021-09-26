import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { UIService } from '../shared/ui.service';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { DbDrink } from './drinks/drink-item.model';

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



  


  // storeDrink(drinkInfo: any) {
  //   console.log(drinkInfo);
  //   return this.db.collection(`drinks/categories/${drinkInfo.formValue.category}`).add(drinkInfo.formValue)
  //   .then(res => {
  //     console.log(res)
  //     this.uiService.showSnackbar('drink added' + res, null, 5000)
  //   })
  //   .catch(err => {
  //     this.uiService.showSnackbar('no drink added' + err, null, 5000);
  //   })
  // }

  // editDrink(drink: DbDrink) {
  //   return from(this.db.doc(`drinks/categories/${drink.category}/${drink.drinkId}`).update(drink))
  // }
  // deleteDrink(drink: DbDrink) {
  //   console.log(drink)
  //   return from(this.db.doc(`drinks/categories/${drink.category}/${drink.drinkId}`).delete());
  // }

  // fetchDrinks(category) {
  //   console.log(category)
  //   return this.db
  //   .collection(`drinks/categories/` + category, ref => ref.orderBy('listPosition'))
  //   .snapshotChanges()
  //   .pipe(
  //     map(docArray => {
  //       return docArray.map((doc: any) => {
  //         // console.log(doc.payload.doc.data());
  //         return {
  //           drinkId: doc.payload.doc.id,
  //           nameDutch: doc.payload.doc.data().nameDutch,
  //           nameEnglish: doc.payload.doc.data().nameEnglish,
  //           category: doc.payload.doc.data().category,
  //           price: doc.payload.doc.data().price,
  //           listPosition: doc.payload.doc.data().listPosition,
  //           wineType: doc.payload.doc.data().wineType,
  //           wineContainer: doc.payload.doc.data().wineContainer
  //         }
  //       })
  //     })
  //   )
  // }
}

