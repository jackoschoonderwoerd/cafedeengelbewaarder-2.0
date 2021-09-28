import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  addCourse(mealType, course: Course) {
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
    this.updateMealType(mealType);    
  }

  editCourse(mealType: string, updatedCourse: Course) {
    console.log(updatedCourse);
    const index = this.newDinner.courses.findIndex((course: Course) => {
      return course.id === updatedCourse.id
    })
    this.newDinner.courses[index] = updatedCourse
    this.updateMealType(mealType);
  }

  deleteCourse(mealType: string, courseId: string) {
    console.log(mealType, courseId, this.newDinner);
    const index = this.newDinner.courses.findIndex((course: Course) => {
      return course.id === courseId
    });

    this.newDinner.courses.splice(index, 1);
    this.updateMealType(mealType);
  }
  
  addFoodItem(mealType, courseId, foodItem: FoodItem) {
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
    
    this.updateMealType(mealType)
  }

  deleteFoodItem(mealType, courseId, foodItemId) {
    console.log(mealType, courseId, foodItemId)
    this.newDinner.courses.forEach((course: Course) => {
      if(course.id === courseId) {
        const index = course.foodItems.findIndex((foodItem: FoodItem) => {
          return foodItem.id === foodItemId
        })
        course.foodItems.splice(index, 1)
        course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
        this.updateMealType(mealType);
      }
    })
  }

  editFoodItem(mealType: string, courseId: string, updatedFoodItem: FoodItem) {
    console.log(mealType, courseId, updatedFoodItem);
    this.newDinner.courses.forEach((course: Course) => {
      if(course.id === courseId) {
        const index = course.foodItems.findIndex((foodItem: FoodItem) => {
          return foodItem.id === updatedFoodItem.id;
        });
        console.log(index);
        course.foodItems[index] = updatedFoodItem;
        course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
        
        this.updateMealType(mealType)
      }
    })
  }





  fetchMealTypeSnapshotChangesForLocalUse(mealType) {
    console.log('fetching')
    this.db.collection(mealType)
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

  updateMealType(mealType) {
    console.log(this.newDinner);
    this.newDinner.name = mealType
    this.db.collection(mealType).doc(this.newDinner.id).update(this.newDinner)
    .then(data => {
      console.log(data);
      this.uiService.showSnackbar('database updated', null, 5000)
    })
    .catch(err => {
      console.log(err)
      this.uiService.showSnackbar(err, null, 5000);
    });
  }

  initializeMealType(mealType) {
    this.db.collection(mealType).valueChanges().subscribe(
      data => {
        if(data.length === 0) {
          this.db.collection(mealType).add({
            id: new Date().toString(),
            name: mealType,
            courses: [
              {
                id: new Date().getTime().toString(),
                name: 'brood',
                listPosition: 1,
                nameDutch: 'brood',
                nameEnglish: 'bread',
                remarkDutch: null,
                remarkEnglish: null,
                foodItems: [
                 
                ]
              }
            ]
          })
        }
      }
    )
  }

  checkForMealtypeDb(mealType) {
    this.db.collection(mealType).valueChanges().subscribe(data => {
      if(data.length === 0) {
        this.initializeMealType(mealType);
      } else {
        console.log(data);
      }
    })
  }

  fetchMealTypeSnapshotChanges(mealType) {
    console.log('fetching');
    

    return this.db.collection(mealType)
    .snapshotChanges()
    .pipe(
      map((docArray: any) => {
        return docArray.map((doc: any) => {
          console.log(doc.payload.doc)
          return {
            id: doc.payload.doc.id,
            // courses: doc.payload.doc.data().courses.sort((a, b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a. listPosition) ? -1 : 0)),
            courses: doc.payload.doc.data().courses
          }
        })
      })
    )
  }
}
