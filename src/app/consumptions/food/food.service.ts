import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ComplexOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';
import { Course, FoodItem, MealType, NewCourse, NewFoodItem } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  
  newDinner: MealType = {
    courses: [],
    name: 'dinner'
  }


  addCourse(mealTypeName, mealTypeId, courseName) {
    console.log(courseName, this.newDinner);
    this.newDinner.courses.push({
      name: courseName,
      foodItems: [],
      id: new Date().getTime().toString()
    })
    console.log(this.newDinner);
    this.updateNewDinner();    
  }

  deleteCourse(dinnerName, courseId) {
    console.log(dinnerName, courseId, this.newDinner);
    const index = this.newDinner.courses.findIndex((course: NewCourse) => {
      return course.id === courseId
    });

    console.log(index);
    this.newDinner.courses.splice(index, 1);
    this.updateNewDinner();
  }
  
  constructor(
    private db: AngularFirestore,
    private uiService: UIService
  ) { }

  addFoodItem(dinnerName, courseId, foodItem: FoodItem) {
    foodItem.id = new Date().getTime().toString();
    console.log(foodItem);
    this.newDinner.courses.forEach((course: NewCourse) => {
      if(course.id === courseId) {
        course.foodItems.push(foodItem)
      }
    })
    this.updateNewDinner()
    // return this.db.collection(`food/categories/${foodItem.category}`).add(foodItem)
  }

  deleteFoodItem(dinnerName, courseId, foodItemId) {
    console.log(dinnerName, courseId, foodItemId)
    this.newDinner.courses.forEach((course: NewCourse) => {
      if(course.id === courseId) {
        const index = course.foodItems.findIndex((foodItem: NewFoodItem) => {
          return foodItem.id === foodItemId
        })
        course.foodItems.splice(index, 1)
        this.updateNewDinner();
      }
    })
  }
  editFoodItem(mealTypeName: string, courseId: string, newFoodItem: NewFoodItem) {
    console.log(mealTypeName, courseId, newFoodItem);
    this.newDinner.courses.forEach((course: NewCourse) => {
      if(course.id === courseId) {
        const index = course.foodItems.findIndex((foodItem: NewFoodItem) => {
          return foodItem.id === newFoodItem.id;
        });
        console.log(index);
        course.foodItems[index] = newFoodItem;
        this.updateNewDinner()
      }
    })
  }


  fetchDinnerValueChanges() {
    this.db.collection('dinner').valueChanges().subscribe(data => {
      console.log(data)
    })
  }

  fetchDinnerSnapshotChangesForLocalUse() {
    console.log('fetching')
    this.db.collection('dinner')
      .snapshotChanges()
      .pipe(
        map((docArray: any) => {
          return docArray.map((doc: any) => {
            
            return {
              id: doc.payload.doc.id,
              courses: doc.payload.doc.data().courses,
              name: doc.payload.doc.data().name
            }
          })
        })
      ).subscribe((mealTypeArray: MealType) => {
        this.newDinner = mealTypeArray[0]
        console.log(this.newDinner);
      });
  }

  updateNewDinner() {
    console.log('updating')
    console.log(this.newDinner);
    this.newDinner.name = 'dinner'
    this.db.collection('dinner').doc(this.newDinner.id).update(this.newDinner)
    .then(data => {
      console.log(data);
      this.uiService.showSnackbar('database updated', null, 5000)
    })
    .catch(err => {
      console.log(err)
      this.uiService.showSnackbar(err, null, 5000);
    });
  }

  initializeDinner() {
    this.db.collection('dinner').valueChanges().subscribe(
      data => {
        console.log(data.length)
        if(data.length === 0) {
          this.db.collection('dinner').add({
            courses: []
          })
        }
      }
    )
    // console.log('initializing')
    // if(!this.db.collection('dinner')) {
    //   console.log('no dinner yet')
    //   this.db.collection('dinner').add({
    //     courses: []
    //   })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    // }
  }


  // fetchDinnerSnapshotChanges() {
  //   return this.db.collection('dinner')
  //     .snapshotChanges()
  //     .pipe(
  //       map((docArray: any) => {
  //         return docArray.map((doc: any) => {
  //           return {
  //             id: doc.payload.doc.id,
  //             dinner: doc.payload.doc.data().dinner,
  //           }
  //         })
  //       })
  //     )
  // }

  fetchNewDinnerSnapshotChanges() {
    return this.db.collection('dinner')
    .snapshotChanges()
    // .subscribe(data => console.log(data));
    .pipe(
      map((docArray: any) => {
        return docArray.map((doc: any) => {
          return {
            id: doc.payload.doc.id,
            courses: doc.payload.doc.data().courses,
            name: doc.payload.doc. data().name
          }
        })
      })
    // ).subscribe(data => {
    //   console.log(data)
    // }
    )
  }
  
  // fetchDinnerSnapshotChanges() {
  // this.db.collection('dinner')
  //   .snapshotChanges()
  //   .pipe(
  //     map((docArray: any) => {
  //       return docArray.map((doc: any) => {
  //         return {
  //           id: doc.payload.doc.id,
  //           dinner: doc.payload.doc.data().dinner
  //         }
  //       })
  //     })
  //   ).subscribe(data => console.log(data));
  // }


  // editFoodItem(foodItem: FoodItem) {
  //   return this.db.collection(`food/categories/${foodItem.category}`).doc(foodItem.id).update(foodItem)
  // }
  // deleteFoodItem(foodItem: FoodItem) {
  //   return this.db.collection(`food/categories/${foodItem.category}`).doc(foodItem.id).delete()
  // }

  getFoodCategory(category: string) {
    console.log(category)
    return this.db.collection(`food/categories/` + category, ref => ref.orderBy('listPosition'))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              section: doc.payload.doc.data().section,
              category: doc.payload.doc.data().category,
              nameDutch: doc.payload.doc.data().nameDutch,
              nameEnglish: doc.payload.doc.data().nameEnglish,
              price: doc.payload.doc.data().price,
              course: doc.payload.doc.data().course,
              ingredientsDutch: doc.payload.doc.data().ingredientsDutch,
              ingredientsEnglish: doc.payload.doc.data().ingredientsEnglish,
              vegetarian: doc.payload.doc.data().vegetarian,
              amount: doc.payload.doc.data().amount,
              listPosition: doc.payload.doc.data().listPosition
            }
          })
        })
      )
  }


  // drinks = []

  // categories: string[] = [
  //   'coffee and tea',
  //   'soft drinks',
  //   'wine',
  //   'dutch spirits',
  //   'foreign spirits'
  // ]

  // fetchDrinks() {
  //   let drinks = []
  //   this.categories.forEach((category: string) => {
  //   return this.db
  //     .collection(`drinks/categories/${category}`)
  //     // .collection(`drinks/categories/wine`)
  //     .snapshotChanges()
  //     .pipe(
  //       map(dutchSpiritsArray => {
  //         return dutchSpiritsArray.map((doc: any) => {
  //           return {
  //             drinkId: doc.payload.doc.id,
  //             nameDutch: doc.payload.doc.data().nameDutch,
  //             nameEnglish: doc.payload.doc.data().nameEnglish,
  //             category: doc.payload.doc.data().category,
  //             price: doc.payload.doc.data().price,
  //             listPosition: doc.payload.doc.data().listPosition,
  //             wineType: doc.payload.doc.data().wineType,
  //             wineContainer: doc.payload.doc.data().wineContainer
  //           }
  //         })
  //       })
  //     ).subscribe(data => {
  //       this.drinks.push(data)

  //     })
  //   })
  // }
  // getDrinks() {
  //   return this.drinks
  // }

}
