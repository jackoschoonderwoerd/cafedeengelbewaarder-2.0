
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

  beers: Beer[];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService
  ) { }
  
  
  storeBeer(beer: Beer) {
    return this.db.collection('beers').add(beer)
  }

  editBeer(beer: Beer) {
    beer.listPosition = this.beers.length + 1;
    return from(this.db.doc(`beers/${beer.id}`).update(beer));
  }

  deleteBeer(beerItem: Beer) {
    console.log('deleting' + beerItem.id);
    // return from(this.db.doc(`beers/${beerItem.id}`).delete());
    this.db.doc(`beers/${beerItem.id}`).delete()
    .then(() => {
      this.assingConsecutiveListPositionToEveryBeer()
    });
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
  fetchBeersForLocalUse() {
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
    .subscribe((beers: Beer[]) => {
      this.beers = beers
      console.log(this.beers);
      // this.assingConsecutiveListPositionToEveryBeer();
    })
  }

  moveBeer(direction: string, selectedBeer: Beer) {
    const selectedId = selectedBeer.id
    const selectedIndex = this.beers.findIndex((beer: Beer) => {
      return beer.id === selectedBeer.id;
    })
    console.log(selectedIndex)
    if(direction === 'up') {
      if(selectedIndex === 0) {
        console.log('already at the top');
        return
      } else {
        const swapBeer = this.beers[selectedIndex - 1]
        const selectedPosition = selectedBeer.listPosition
        const swapPosition = swapBeer.listPosition
        selectedBeer.listPosition = swapPosition;
        swapBeer.listPosition = selectedPosition;
        this.db.doc(`beers/${selectedBeer.id}`).update(selectedBeer);
        this.db.doc(`beers/${swapBeer.id}`).update(swapBeer);  
      }
    } else if(direction === 'down') {
      if(selectedIndex + 1 === this.beers.length) {
        console.log('already at the bottom')
      } else {
        const swapBeer = this.beers[selectedIndex + 1]
        const selectedPosition = selectedBeer.listPosition
        const swapPosition = swapBeer.listPosition
        selectedBeer.listPosition = swapPosition;
        swapBeer.listPosition = selectedPosition;
        this.db.doc(`beers/${selectedBeer.id}`).update(selectedBeer);
        this.db.doc(`beers/${swapBeer.id}`).update(swapBeer);
      }
    }
  }

  assingConsecutiveListPositionToEveryBeer() {
    let i = 0;
    this.beers.forEach((beer: Beer) => {
      beer.listPosition = i;
      i++
      this.db.doc(`beers/${beer.id}`).update(beer);
    })
    console.log(this.beers);
  }
}


















