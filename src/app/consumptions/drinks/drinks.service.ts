import { Injectable } from '@angular/core';
import { Beverage, BeverageType, DbDrink, DrinkItem } from './drink-item.model';
import { WineItem } from './drink-item.model';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';


@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  categories: string[] = [
    'coffee and tea',
    'soft drinks',
    'wine',
    'dutch spirits',
    'foreign spirits'
  ]

  getCategories() {
    return this.categories;
  }

  constructor(
    private db: AngularFirestore,
    private uiService: UIService
  ) { }

  storeDrink(drinkInfo: any) {
    console.log(drinkInfo);
    return this.db.collection(`drinks/categories/${drinkInfo.formValue.category}`).add(drinkInfo.formValue)
    .then(res => {
      console.log(res)
      this.uiService.showSnackbar('drink added' + res, null, 5000)
    })
    .catch(err => {
      this.uiService.showSnackbar('no drink added' + err, null, 5000);
    })
  }

  editDrink(drink: DbDrink) {
    return from(this.db.doc(`drinks/categories/${drink.category}/${drink.drinkId}`).update(drink))
  }
  deleteDrink(drink: DbDrink) {
    console.log(drink)
    return from(this.db.doc(`drinks/categories/${drink.category}/${drink.drinkId}`).delete());
  }

  fetchDrinks(category) {
    console.log(category)
    return this.db
    .collection(`drinks/categories/` + category, ref => ref.orderBy('listPosition'))
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map((doc: any) => {
          // console.log(doc.payload.doc.data());
          return {
            drinkId: doc.payload.doc.id,
            nameDutch: doc.payload.doc.data().nameDutch,
            nameEnglish: doc.payload.doc.data().nameEnglish,
            category: doc.payload.doc.data().category,
            price: doc.payload.doc.data().price,
            listPosition: doc.payload.doc.data().listPosition,
            wineType: doc.payload.doc.data().wineType,
            wineContainer: doc.payload.doc.data().wineContainer
          }
        })
      })
    )
  }

  beverageTypes: BeverageType[] = [
    {
      nameDutch:'koffie en thee',
      nameEnglish: 'coffee and tea',
      beverages: [
        {
          nameDutch: 'Espresso',
          nameEnglish: 'Espresso',
          priceUnit: 2.3,
        },
        {
          nameDutch: 'Koffie',
          nameEnglish: 'Coffee',
          priceUnit: 2.4,
        },
        {
          nameDutch: 'Cappuccino',
          nameEnglish: 'Cappuccino',
          priceUnit: 2.7,
        },
        {
          nameDutch: 'Koffie verkeerd',
          nameEnglish: 'Latte',
          priceUnit: 3,
        },
        {
          nameDutch: 'Koffie verkeerd met havermelk',
          nameEnglish: 'Latte with Oat milk',
          priceUnit: 3.4,
        },
        {
          nameDutch: 'Dubbele espresso',
          nameEnglish: 'Double espresso',
          priceUnit: 3,
        },
        {
          nameDutch: 'Thee',
          nameEnglish: 'Tea',
          priceUnit: 2.5,
        },
        {
          nameDutch: 'Muntthee',
          nameEnglish: 'Mint tea',
          priceUnit: 3,
        },
        {
          nameDutch: 'Gemberthee',
          nameEnglish: 'Ginger tea',
          priceUnit: 3,
        },
        {
          nameDutch: 'Warme chocolademelk',
          nameEnglish: 'Hot chocolate',
          priceUnit: 3,
        },
        {
          nameDutch: 'Warme chocolademelk met slagroom',
          nameEnglish: 'Hot chocolate with whipped cream',
          priceUnit: 3.5,
        },
        {
          nameDutch: 'Carajillo',
          nameEnglish: 'Carajillo',
          priceUnit: 3,
        },
        {
          nameDutch: 'Irish coffee',
          nameEnglish: 'Irish coffee',
          priceUnit: 7,
        },
      ]
    },
    {
      nameDutch: 'frisdranken',
      nameEnglish: 'soft drinks',
      beverages : [
        {
          nameDutch: 'Coca Cola',
          nameEnglish: 'Coca Cola',
          priceUnit: 3,
        },
        {
          nameDutch: 'Coca Cola zero',
          nameEnglish: 'Coca Cola zero',
          priceUnit: 3,
        },
        {
          nameDutch: 'Chaudfontaine rood',
          nameEnglish: 'Chaudfontaine red',
          priceUnit: 3,
        },
        {
          nameDutch: 'Fanta orange',
          nameEnglish: 'Fanta orange',
          priceUnit: 3,
        },
        {
          nameDutch: 'Fanta cassis',
          nameEnglish: 'Fanta cassis',
          priceUnit: 3,
        },
        {
          nameDutch: 'Sprite',
          nameEnglish: 'Sprite',
          priceUnit: 3,
        },
        {
          nameDutch: 'Finley bitter lemon',
          nameEnglish: 'Finley bitter lemon',
          priceUnit: 3,
        },
        {
          nameDutch: 'Finley ginger ale',
          nameEnglish: 'Finley ginger ale',
          priceUnit: 3,
        },
        {
          nameDutch: 'Fuze Tea Black sparkling',
          nameEnglish: 'Fuze Tea Black sparkling',
          priceUnit: 3,
        },
        {
          nameDutch: 'Fuze Tea Green',
          nameEnglish: 'Fuze Tea Green',
          priceUnit: 3,
        },
        {
          nameDutch: 'Minute Maid tomatensap',
          nameEnglish: 'Minute Maid tomato juice',
          priceUnit: 3,
        },
        {
          nameDutch: 'Biologisce sapjes (Rumpts or Schulp)',
          nameEnglish: 'Organic juices (Rumpts or Schulp)',
          priceUnit: 3,
        },
        {
          nameDutch: 'Chocolademelk',
          nameEnglish: 'Chocolate milk',
          priceUnit: 2.5,
        },
        {
          nameDutch: 'Siroop',
          nameEnglish: 'Syrup/Squash',
          priceUnit: 2,
        },
      ]
    },
    {
      nameDutch: 'wijn',
      nameEnglish: 'wine',
      beverages: [
        {
          color: 'white',
          nameDutch: 'Huiswijn',
          nameEnglish: 'House Wine',
          priceUnit: 4,
          priceBottle: 20,
          bottle: true
        },
        {
          color: 'red',
          nameDutch: 'Huiswijn',
          nameEnglish: 'House Wine',
          priceUnit: 4,
          priceBottle: 20,
          bottle: true
        },
        {
          color: 'red',
          nameDutch: 'Vacqueyras, Le Poète 2014 (50cl)',
          nameEnglish: 'Vacqueyras, Le Poète 2014 (50cl)',
          priceUnit: null,
          priceBottle: 17.5,
          bottle: false
        },
        {
          color: 'rose',
          nameDutch: 'Rosé',
          nameEnglish: 'Rosé',
          priceUnit: 4,
          priceBottle: 20,
          bottle: true
        },
        {
          color: null,
          nameDutch: 'Rode port',
          nameEnglish: 'Red port',
          priceUnit: 4,
          priceBottle: null,
          bottle: false
        },
        {
          color: 'prosecco',
          nameDutch: 'Prosecco',
          nameEnglish: 'Prosecco',
          priceUnit: null,
          priceBottle: 20,
          bottle: true
        },
      ]
    },
    {
      nameDutch: 'binnenlands gedestileerd',
      nameEnglish: 'dutch spirits', 
      beverages: [
        {
          nameDutch: 'Wees jonge jenever',
          nameEnglish: 'Wees Young Jenever',
          priceUnit: 3
        },
        {
          nameDutch: 'Wees oude jenever',
          nameEnglish: 'Wees Old Jenever',
          priceUnit: 3.3
        },
        {
          nameDutch: 'Zuidam jonge jenever',
          nameEnglish: 'Zuidam Young Jenever',
          priceUnit: 3.3
        },
        {
          nameDutch: 'Zuidam oude jenever',
          nameEnglish: 'Zuidam Old Jenever',
          priceUnit: 3.6
        },
        {
          nameDutch: 'Zuidam korenwijn',
          nameEnglish: 'Zuidam korenwijn',
          priceUnit: 4.1
        },
        {
          nameDutch: 'Beerenburg',
          nameEnglish: 'Beerenburg',
          priceUnit: 3
        },
        {
          nameDutch: 'Hoppe vieux',
          nameEnglish: 'Hoppe vieux',
          priceUnit: 3
        }
      ]
    },
    {
      nameDutch: 'buitenlands gedestileerd',
      nameEnglish: 'foreign spirits',
      beverages: [
        {
          nameDutch: 'Glen Talloch',
          nameEnglish: 'Glen Talloch',
          priceUnit: 4
        },
        {
          nameDutch: 'Jameson',
          nameEnglish: 'Jameson',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Bushmills',
          nameEnglish: 'Bushmills',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Famous Grouse',
          nameEnglish: 'Famous Grouse',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Jack Daniel\'s',
          nameEnglish: 'Jack Daniel\'s',
          priceUnit: 5.5
        },
        {
          nameDutch: 'Glen fiddich single malt',
          nameEnglish: 'Glen fiddich single malt',
          priceUnit: 6.5
        },
        {
          nameDutch: 'Osborne 103',
          nameEnglish: 'Osborne 103',
          priceUnit: 4
        },
        {
          nameDutch: 'Hennessy',
          nameEnglish: 'Hennessy',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Martell VS',
          nameEnglish: 'Martell VS',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Courvoisier',
          nameEnglish: 'Courvoisier',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Stolichnaya',
          nameEnglish: 'Stolichnaya',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Zubrowka',
          nameEnglish: 'Zubrowka',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Calvados',
          nameEnglish: 'Calvados',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Armagnac',
          nameEnglish: 'Armagnac',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Grappa',
          nameEnglish: 'Grappa',
          priceUnit: 5
        },
        {
          nameDutch: 'Martini',
          nameEnglish: 'Martini',
          priceUnit: 3.7
        },
        {
          nameDutch: 'Campari',
          nameEnglish: 'Campari',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Bacardi',
          nameEnglish: 'Bacardi',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Bacardi black',
          nameEnglish: 'Bacardi black',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Goron\'s Gin',
          nameEnglish: 'Goron\'s Gin',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Ricard',
          nameEnglish: 'Ricard',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Tequila silver',
          nameEnglish: 'Tequila silver',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Southern Comfort',
          nameEnglish: 'Southern Comfort',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Tia Maria',
          nameEnglish: 'Tia Maria',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Licor 43',
          nameEnglish: 'Licor 43',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Disaronno amaretto',
          nameEnglish: 'Disaronno amaretto',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Bailey\'s',
          nameEnglish: 'Bailey\'s',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Grand Marnier',
          nameEnglish: 'Grand Marnier',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Drambuie',
          nameEnglish: 'Drambuie',
          priceUnit: 4.7
        },
        {
          nameDutch: 'Sambuca',
          nameEnglish: 'Sambuca',
          priceUnit: 4.7
        },
      ]
    }
  ]

  coffeeAndTeas: DrinkItem[] = [
    // {
    //   nameDutch: 'Espresso',
    //   nameEnglish: 'Espresso',
    //   priceUnit: 2.3,
    // },
    // {
    //   nameDutch: 'Koffie',
    //   nameEnglish: 'Coffee',
    //   priceUnit: 2.4,
    // },
    // {
    //   nameDutch: 'Cappuccino',
    //   nameEnglish: 'Cappuccino',
    //   priceUnit: 2.7,
    // },
    // {
    //   nameDutch: 'Koffie verkeerd',
    //   nameEnglish: 'Latte',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Koffie verkeerd met havermelk',
    //   nameEnglish: 'Latte with Oat milk',
    //   priceUnit: 3.4,
    // },
    // {
    //   nameDutch: 'Dubbele espresso',
    //   nameEnglish: 'Double espresso',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Thee',
    //   nameEnglish: 'Tea',
    //   priceUnit: 2.5,
    // },
    // {
    //   nameDutch: 'Muntthee',
    //   nameEnglish: 'Mint tea',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Gemberthee',
    //   nameEnglish: 'Ginger tea',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Warme chocolademelk',
    //   nameEnglish: 'Hot chocolate',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Warme chocolademelk met slagroom',
    //   nameEnglish: 'Hot chocolate with whipped cream',
    //   priceUnit: 3.5,
    // },
    // {
    //   nameDutch: 'Carajillo',
    //   nameEnglish: 'Carajillo',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Irish coffee',
    //   nameEnglish: 'Irish coffee',
    //   priceUnit: 7,
    // },
  ]

  softDrinks: DrinkItem[] = [
    // {
    //   nameDutch: 'Coca Cola',
    //   nameEnglish: 'Coca Cola',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Coca Cola zero',
    //   nameEnglish: 'Coca Cola zero',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Chaudfontaine rood',
    //   nameEnglish: 'Chaudfontaine red',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Fanta orange',
    //   nameEnglish: 'Fanta orange',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Fanta cassis',
    //   nameEnglish: 'Fanta cassis',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Sprite',
    //   nameEnglish: 'Sprite',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Finley bitter lemon',
    //   nameEnglish: 'Finley bitter lemon',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Finley ginger ale',
    //   nameEnglish: 'Finley ginger ale',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Fuze Tea Black sparkling',
    //   nameEnglish: 'Fuze Tea Black sparkling',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Fuze Tea Green',
    //   nameEnglish: 'Fuze Tea Green',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Minute Maid tomatensap',
    //   nameEnglish: 'Minute Maid tomato juice',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Biologisce sapjes (Rumpts or Schulp)',
    //   nameEnglish: 'Organic juices (Rumpts or Schulp)',
    //   priceUnit: 3,
    // },
    // {
    //   nameDutch: 'Chocolademelk',
    //   nameEnglish: 'Chocolate milk',
    //   priceUnit: 2.5,
    // },
    // {
    //   nameDutch: 'Siroop',
    //   nameEnglish: 'Syrup/Squash',
    //   priceUnit: 2,
    // },
  ]

  wines: WineItem[] = [
    // {
    //   color: 'white',
    //   nameDutch: 'Huiswijn',
    //   nameEnglish: 'House Wine',
    //   priceUnit: 4,
    //   priceBottle: 20,
    //   bottle: true
    // },
    // {
    //   color: 'red',
    //   nameDutch: 'Huiswijn',
    //   nameEnglish: 'House Wine',
    //   priceUnit: 4,
    //   priceBottle: 20,
    //   bottle: true
    // },
    // {
    //   color: 'red',
    //   nameDutch: 'Vacqueyras, Le Poète 2014 (50cl)',
    //   nameEnglish: 'Vacqueyras, Le Poète 2014 (50cl)',
    //   priceUnit: null,
    //   priceBottle: 17.5,
    //   bottle: false
    // },
    // {
    //   color: 'rose',
    //   nameDutch: 'Rosé',
    //   nameEnglish: 'Rosé',
    //   priceUnit: 4,
    //   priceBottle: 20,
    //   bottle: true
    // },
    // {
    //   color: null,
    //   nameDutch: 'Rode port',
    //   nameEnglish: 'Red port',
    //   priceUnit: 4,
    //   priceBottle: null,
    //   bottle: false
    // },
    // {
    //   color: 'prosecco',
    //   nameDutch: 'Prosecco',
    //   nameEnglish: 'Prosecco',
    //   priceUnit: null,
    //   priceBottle: 20,
    //   bottle: true
    // },
  ]

  dutchSpirits: DrinkItem[] = [
    // {
    //   nameDutch: 'Wees jonge jenever',
    //   nameEnglish: 'Wees Young Jenever',
    //   priceUnit: 3
    // },
    // {
    //   nameDutch: 'Wees oude jenever',
    //   nameEnglish: 'Wees Old Jenever',
    //   priceUnit: 3.3
    // },
    // {
    //   nameDutch: 'Zuidam jonge jenever',
    //   nameEnglish: 'Zuidam Young Jenever',
    //   priceUnit: 3.3
    // },
    // {
    //   nameDutch: 'Zuidam oude jenever',
    //   nameEnglish: 'Zuidam Old Jenever',
    //   priceUnit: 3.6
    // },
    // {
    //   nameDutch: 'Zuidam korenwijn',
    //   nameEnglish: 'Zuidam korenwijn',
    //   priceUnit: 4.1
    // },
    // {
    //   nameDutch: 'Beerenburg',
    //   nameEnglish: 'Beerenburg',
    //   priceUnit: 3
    // },
    // {
    //   nameDutch: 'Hoppe vieux',
    //   nameEnglish: 'Hoppe vieux',
    //   priceUnit: 3
    // }
  ]

  foreignSpirits: DrinkItem[] = [
    // {
    //   nameDutch: 'Glen Talloch',
    //   nameEnglish: 'Glen Talloch',
    //   priceUnit: 4
    // },
    // {
    //   nameDutch: 'Jameson',
    //   nameEnglish: 'Jameson',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Bushmills',
    //   nameEnglish: 'Bushmills',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Famous Grouse',
    //   nameEnglish: 'Famous Grouse',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Jack Daniel\'s',
    //   nameEnglish: 'Jack Daniel\'s',
    //   priceUnit: 5.5
    // },
    // {
    //   nameDutch: 'Glen fiddich single malt',
    //   nameEnglish: 'Glen fiddich single malt',
    //   priceUnit: 6.5
    // },
    // {
    //   nameDutch: 'Osborne 103',
    //   nameEnglish: 'Osborne 103',
    //   priceUnit: 4
    // },
    // {
    //   nameDutch: 'Hennessy',
    //   nameEnglish: 'Hennessy',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Martell VS',
    //   nameEnglish: 'Martell VS',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Courvoisier',
    //   nameEnglish: 'Courvoisier',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Stolichnaya',
    //   nameEnglish: 'Stolichnaya',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Zubrowka',
    //   nameEnglish: 'Zubrowka',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Calvados',
    //   nameEnglish: 'Calvados',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Armagnac',
    //   nameEnglish: 'Armagnac',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Grappa',
    //   nameEnglish: 'Grappa',
    //   priceUnit: 5
    // },
    // {
    //   nameDutch: 'Martini',
    //   nameEnglish: 'Martini',
    //   priceUnit: 3.7
    // },
    // {
    //   nameDutch: 'Campari',
    //   nameEnglish: 'Campari',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Bacardi',
    //   nameEnglish: 'Bacardi',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Bacardi black',
    //   nameEnglish: 'Bacardi black',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Goron\'s Gin',
    //   nameEnglish: 'Goron\'s Gin',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Ricard',
    //   nameEnglish: 'Ricard',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Tequila silver',
    //   nameEnglish: 'Tequila silver',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Southern Comfort',
    //   nameEnglish: 'Southern Comfort',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Tia Maria',
    //   nameEnglish: 'Tia Maria',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Licor 43',
    //   nameEnglish: 'Licor 43',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Disaronno amaretto',
    //   nameEnglish: 'Disaronno amaretto',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Bailey\'s',
    //   nameEnglish: 'Bailey\'s',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Grand Marnier',
    //   nameEnglish: 'Grand Marnier',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Drambuie',
    //   nameEnglish: 'Drambuie',
    //   priceUnit: 4.7
    // },
    // {
    //   nameDutch: 'Sambuca',
    //   nameEnglish: 'Sambuca',
    //   priceUnit: 4.7
    // },
  ];
  
 

  getCoffeeAndTeas() {
    return this.coffeeAndTeas;
  }
  getSoftDrinks() {
    return this.softDrinks;
  }
  getWines() {
    return this.wines;
  }
  getDutchSpirits() {
    return this.dutchSpirits;
  }
  getForeignSpirits() {
    return this.foreignSpirits;
  }
  getBeverageTypes() {
    return this.beverageTypes
  }
}
