import { Injectable } from '@angular/core';
import { Beverage, BeverageType, DrinkItem, AllDrinks, Drink, DrinkCategory } from './drink.model';
import { WineItem } from './drink.model';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';


@Injectable({
  providedIn: 'root'
})
export class DrinksService {

 
  allDrinks: AllDrinks

  

  constructor(
    private db: AngularFirestore,
    private uiService: UIService
  ) { }

  initializeDrinks() {
    this.db.collection('drinks').valueChanges().subscribe(
      data => {
        if (data.length === 0) {
          this.db.collection('drinks').add({
            categories: [
              {
                name: 'hot',
                drinks: [1, 2, 3]
              }
            ]
          })
        }
      }
    )
  }

  fetchDrinksForLocalUse() {
    this.db.collection('drinks')
      .snapshotChanges()
      .pipe(
        map((docArray: any) => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              categories: doc.payload.doc.data().categories
            }
          })
        })
      )
      .subscribe((allDrinks: AllDrinks) => {
        this.allDrinks = allDrinks[0];
      });
  }
  


  fetchDrinks() {
    return this.db
      .collection('drinks')
      .snapshotChanges()
      .pipe(
        map((docArray: any) => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              categories: doc.payload.doc.data().categories
            }
          })
        })
      )
  }

  addCategory(drinkCategory: DrinkCategory) {
    console.log(drinkCategory.nameDutch);
    console.log(this.allDrinks);
    console.log(typeof this.allDrinks.categories);
    this.allDrinks.categories.push({
      nameDutch: drinkCategory.nameDutch,
      nameEnglish: drinkCategory.nameEnglish,
      drinks:
      [],
      listPosition: drinkCategory.listPosition,
      id: new Date().getTime().toString()
    });
    this.updateDrinks()
  }

  editCategory(updatedCategory: DrinkCategory) {
    console.log(updatedCategory);
    const index = this.allDrinks.categories.findIndex((category: DrinkCategory) => {
      return category.id === updatedCategory.id
    })
    console.log(index);
    this.allDrinks.categories[index] = updatedCategory;
    this.updateDrinks();
  }


  deleteCategory(id: string) {
    console.log(this.allDrinks)
    const index = this.allDrinks.categories.findIndex((categorie: DrinkCategory) => {
      return categorie.id === id
    })
    console.log(index);
    this.allDrinks.categories.splice(index, 1)
    this.updateDrinks()
  }

  moveCategory(direction: string, categoryId: string) {
    console.log(direction, categoryId);
    const targetedIndex = this.allDrinks.categories.findIndex((category: DrinkCategory) => {
      return category.id === categoryId;
    })
    console.log(targetedIndex);
    const listPositionTargetedIndex = this.allDrinks.categories[targetedIndex].listPosition;
    if(direction === 'down') {
      // EXCLUDE THE LAST ELEMENT IN THE CATEGORIES-ARRAY
      if(targetedIndex + 1 === this.allDrinks.categories.length) {
        alert( 'you are already at the bottom')
        return;
      } else {
        // SWAP THE LISTPOSITION WITH THE LP OF THE NEXT ELEMENT IN THE ARRAY
        this.allDrinks.categories[targetedIndex].listPosition = this.allDrinks.categories[targetedIndex +1].listPosition;
        this.allDrinks.categories[targetedIndex +1].listPosition = listPositionTargetedIndex;

      }
    } else if(direction === 'up') {
      // EXCLUDE THE FIRST ELEMENT
      if(targetedIndex === 0) {
        alert('you are already at the top');
        return
      } else {
        this.allDrinks.categories[targetedIndex].listPosition = this.allDrinks.categories[targetedIndex -1].listPosition;
        this.allDrinks.categories[targetedIndex -1].listPosition = listPositionTargetedIndex;
      }
    }
    this.allDrinks.categories = this.sortAndOrderArray(this.allDrinks.categories)
    this.updateDrinks();
  }

  addDrink(categoryId: string, drink: Drink) {
    
    this.allDrinks.categories.forEach((category: DrinkCategory) => {
      if(category.id === categoryId) {
        // drink.listPosition = category.drinks.length;
        category.drinks.push(drink)
        // category.drinks.sort((a, b) =>(a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
      }
      this.updateDrinks();
    })
  }

  editDrink(categoryId: string, updatedDrink: Drink) {
    console.log(categoryId, updatedDrink);
    this.allDrinks.categories.forEach((category: DrinkCategory) => {
      if(category.id === categoryId) {
        console.log('found')
        const index = category.drinks.findIndex((drink: Drink) => {
          return drink.id === updatedDrink.id
        })
        console.log(index);
        category.drinks[index] = updatedDrink;
        // category.drinks.sort((a, b) =>(a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
        // console.log(this.allDrinks)
        this.updateDrinks();
        // this.storeAllNewDrinks()
      }
    })
  }

  deleteDrink(categoryId: string, drinkId: string) {
    this.allDrinks.categories.forEach((category: DrinkCategory) => {
      if(category.id === categoryId) {
        const index = category.drinks.findIndex((drink: Drink) => {
          return drink.id === drinkId;
        });
        console.log(index);
        category.drinks.splice(index, 1)
        this.updateDrinks();
      }
    })
  }
  

  updateDrinks() {
    this.db.collection('drinks').doc(this.allDrinks.id).update(this.allDrinks)
      .then(result => {
        this.uiService.showSnackbar('database updated', null, 5000);
      })
      .catch(err => console.log(err));
  }
  
  moveDrink(direction: string, categoryId: string, drinkId: string, index) {
    // SWAP THE POSITION IN THE ARRY, UPDATE THE DATABASE
    console.log(direction, categoryId, drinkId, 'index: ', index);
    this.allDrinks.categories.forEach((category: DrinkCategory) => {
      if(category.id === categoryId) {
        if(direction === 'up') {
          if(index === 0) {
            console.log('cannot go up')
          } else {
            console.log('start moving up');
            const goingUp = category.drinks[index]
            const goingDown = category.drinks[index -1]
            category.drinks[index]= goingDown;
            category.drinks[index -1] = goingUp
            this.updateDrinks();
          }
        } else if(direction === 'down') {
          if(index === category.drinks.length -1) {
            console.log('cant move down') 
          } else {
            console.log('start moving down');
            const goingDown = category.drinks[index];
            const goinUp = category.drinks[index +1];
            category.drinks[index] = goinUp;
            category.drinks[index +1]= goingDown;
            this.updateDrinks();
          }
        }
      }
    })  
  }



  private sortAndOrderArray(array: any[]) {
    array.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
          // 6 ASSIGN CONSECUTIVE ASCENDING NUMBERS TO THE LISTPOSITION OF THE ARRAY
          let i = 0
    array.forEach((item: any) => {
      item.listPosition = i
       i = i + 1
    })
    return array
  }



  beverageTypes: BeverageType[] = [
    {
      nameDutch: 'koffie en thee',
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
      beverages: [
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
