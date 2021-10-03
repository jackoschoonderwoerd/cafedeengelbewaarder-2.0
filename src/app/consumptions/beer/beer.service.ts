
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';
import { Beer } from './beer.model';

@Injectable({
  providedIn: 'root'
})
export class BeerService {



  constructor(
    private db: AngularFirestore,
    private uiService: UIService
  ) { }
  
  
  storeBeer(beer: Beer) {
    return this.db.collection('beers').add(beer)
  }

  editBeer(beer: Beer) {
    return from(this.db.doc(`beers/${beer.id}`).update(beer));
  }

  deleteBeer(beerItem: Beer) {
    console.log('deleting' + beerItem.id);
    return from(this.db.doc(`beers/${beerItem.id}`).delete());
  }


  fetchBeers(): Observable<Beer[]> {
    return this.db
    .collection('beers', ref => ref.orderBy('listPosition'))
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map((doc: any) => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            price: doc.payload.doc.data().price,
            content: doc.payload.doc.data().content,
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
}


















