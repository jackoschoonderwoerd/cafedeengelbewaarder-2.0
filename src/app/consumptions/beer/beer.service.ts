
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';
import { BeerItem } from './beer-item.model';

@Injectable({
  providedIn: 'root'
})
export class BeerService {



  constructor(
    private db: AngularFirestore,
    private uiService: UIService
  ) { }
  
  
  storeBeer(beerItem: BeerItem) {
    console.log(beerItem)
    return this.db.collection('beers').add(beerItem)
    .then(res => console.log(res))
    .catch(err => {
      this.uiService.showSnackbar('There was a problem adding beer to the data base' + err, null, 50000)
    });
  }

  editBeer(beerItem: BeerItem) {
    console.log(beerItem.beerId);
    return from(this.db.doc(`beers/${beerItem.beerId}`).update(beerItem));
  }

  deleteBeer(beerItem: BeerItem) {
    console.log('deleteing' + beerItem.beerId);
    return from(this.db.doc(`beers/${beerItem.beerId}`).delete());
  }

  fetchBeers(): Observable<BeerItem[]> {
    return this.db
    .collection('beers', ref => ref.orderBy('listPosition'))
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map((doc: any) => {
          return {
            beerId: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            price: doc.payload.doc.data().price,
            amount: doc.payload.doc.data().amount,
            percentage: doc.payload.doc.data().percentage,
            listPosition: doc.payload.doc.data().listPosition,
            draught: doc.payload.doc.data().draught,
            descriptionDutch: doc.payload.doc.data().descriptionDutch,
            descriptionEnglish: doc.payload.doc.data().descriptionEnglish,
          }
        })
      })
    )
  }

  // fetchBeers() {
  //   console.log('fetching', ref => ref.orderBy('listPosition'));
  //   return this.db
  //   .collection('beers')
  //   .valueChanges()
  // }
}


















