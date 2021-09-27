import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ComplexOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';
import { Course, FoodItem, MealType } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  
  newDinner: MealType = {
    courses: [],
    name: 'dinner'
  }

  constructor(
    private db: AngularFirestore,
    private uiService: UIService
  ) { }

  addCourse(mealTypeName, course: Course) {
    console.log(course, this.newDinner);
    this.newDinner.courses.push({
      nameDutch: course.nameDutch,
      nameEnglish: course.nameEnglish,
      foodItems: [],
      listPosition: course.listPosition,
      remarkDutch: course.remarkDutch,
      remarkEnglish: course.remarkEnglish,
      id: new Date().getTime().toString()
    })
    console.log(this.newDinner);
    this.updateNewDinner();    
  }

  editCourse(updatedCourse: Course) {
    console.log(updatedCourse);
    const index = this.newDinner.courses.findIndex((course: Course) => {
      return course.id === updatedCourse.id
    })
    this.newDinner.courses[index] = updatedCourse
    this.updateNewDinner();
  }

  deleteCourse(dinnerName, courseId) {
    console.log(dinnerName, courseId, this.newDinner);
    const index = this.newDinner.courses.findIndex((course: Course) => {
      return course.id === courseId
    });

    console.log(index);
    this.newDinner.courses.splice(index, 1);
    this.updateNewDinner();
  }
  
  addFoodItem(dinnerName, courseId, foodItem: FoodItem) {
    foodItem.id = new Date().getTime().toString();
    
    this.newDinner.courses.forEach((course: Course) => {
      if(course.id === courseId) {
        if (!course.foodItems) {
          course.foodItems = [];
        } 
        course.foodItems.push(foodItem)
        course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
      }
    })
    
    this.updateNewDinner()
  }

  deleteFoodItem(dinnerName, courseId, foodItemId) {
    console.log(dinnerName, courseId, foodItemId)
    this.newDinner.courses.forEach((course: Course) => {
      if(course.id === courseId) {
        const index = course.foodItems.findIndex((foodItem: FoodItem) => {
          return foodItem.id === foodItemId
        })
        course.foodItems.splice(index, 1)
        course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
        this.updateNewDinner();
      }
    })
  }

  editFoodItem(mealTypeName: string, courseId: string, updatedFoodItem: FoodItem) {
    console.log(mealTypeName, courseId, updatedFoodItem);
    this.newDinner.courses.forEach((course: Course) => {
      if(course.id === courseId) {
        const index = course.foodItems.findIndex((foodItem: FoodItem) => {
          return foodItem.id === updatedFoodItem.id;
        });
        console.log(index);
        course.foodItems[index] = updatedFoodItem;
        course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
        
        this.updateNewDinner()
      }
    })
  }

  private sortFoodItems(foodItems: FoodItem[]) {
    return foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
  }


  // fetchDinnerValueChanges() {
  //   this.db
  //     .collection('dinner')
  //     .valueChanges()
  //     .subscribe(data => {
  //     console.log(data)
  //   })
  // }

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
  }

  fetchNewDinnerSnapshotChanges() {
    return this.db.collection('dinner')
    .snapshotChanges()
    // .subscribe(data => console.log(data));
    .pipe(
      map((docArray: any) => {
        return docArray.map((doc: any) => {
          console.log(doc.payload.doc)
          return {
            id: doc.payload.doc.id,
            courses: doc.payload.doc.data().courses.sort((a, b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a. listPosition) ? -1 : 0)),
          }
        })
      })
    )
  }
  


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
}
