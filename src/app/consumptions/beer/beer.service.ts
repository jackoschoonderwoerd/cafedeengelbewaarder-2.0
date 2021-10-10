
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
  beersArray: Beer[]
  beersArrayId: string;

  constructor(
    private db: AngularFirestore,
    private uiService: UIService
  ) { }
  
  
  addBeerToArray (beer: Beer) {
    beer.id = new Date().getTime().toString();
    console.log(beer);
    this.beersArray.push(beer);
    this.updateBeerArray()
  }
  deleteBeerFromArray(id: string) {
    const index = this.beersArray.findIndex((beer: Beer) => {
      return beer.id === id
    })
    this.beersArray.splice(index, 1);
    this.updateBeerArray();
  }

  updateBeerArray() {
    this.beersArray.forEach((beer: Beer) => {
      let i = 0
      if(beer.id === null) {
        beer.id = (new Date().getTime() + i).toString()
        i++
      }
    })
    this.db.collection('beerArray').doc(this.beersArrayId).update({
      beerArray: this.beersArray
    })
      .then(result => {
        console.log('beerArray updated')
      })
      .catch(err => console.log(err));
  }

  storeBeer(beer: Beer) {
    return this.db.collection('beers').add(beer)
  }
  
  editBeer(updatedBeer: Beer) {
    const index = this.beersArray.findIndex((beer: Beer) => {
      return beer.id === updatedBeer.id
    })
    this.beersArray[index] = updatedBeer;
    this.updateBeerArray();

  }

  // deleteBeer(beerItem: Beer) {
  //   this.db.doc(`beers/${beerItem.id}`).delete()
  //   .then(() => {
  //   });
  // }

  fetchBeerArray() {
    return this.db
      .collection('beerArray')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              beerArray: doc.payload.doc.data().beerArray
            }
          }) 
        })
      )
      // .subscribe((beerArray: any) => {
      //   console.log(beerArray)
      // })
      
  }
  fetchBeerArrayForLocalUse() {
    return this.db
      .collection('beerArray')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              beerArray: doc.payload.doc.data().beerArray
            }
          }) 
        })
      )
      .subscribe((beerArray: any) => {
        this.beersArray = beerArray[0].beerArray;
        this.beersArrayId = beerArray[0].id
      })
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
      // this.assingConsecutiveListPositionToEveryBeer();
      // this.storeBeerArray()
    })
  }

  moveBeer(direction: string, beerId: string) {
    console.log(direction, beerId)
    const targetedIndex = this.beersArray.findIndex((beer: Beer) => {
      return beer.id === beerId
    })
    console.log(targetedIndex);
    if(direction === 'up') {
      if(targetedIndex === 0) {
        console.log('already at the top')
      } else {
        const beerMovingUp = this.beersArray[targetedIndex]
        const beerMovingDown = this.beersArray[targetedIndex -1]
        this.beersArray[targetedIndex] = beerMovingDown
        this.beersArray[targetedIndex -1] = beerMovingUp;
      }
    } else if(direction === 'down') {
      if(targetedIndex === this.beersArray.length -1) {
        console.log('already at the bottom')
      } else {
        const beerMovingUp = this.beersArray[targetedIndex]
        const beerMovingDown = this.beersArray[targetedIndex +1]
        this.beersArray[targetedIndex] = beerMovingDown
        this.beersArray[targetedIndex +1] = beerMovingUp;
      }
    }
    this.updateBeerArray();
  }
}


















