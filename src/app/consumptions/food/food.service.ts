import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { listenerCount } from 'process';

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
    

    console.log('MEALTYPE: ', mealType, 'COURSE: ', course, 'THIS.NEWDINNER: ',  this.newDinner);
    console.log(this.newDinner.courses.length)
    this.newDinner.courses.push({
      nameDutch: course.nameDutch,
      nameEnglish: course.nameEnglish,
      foodItems: [],
      listPosition: this.newDinner.courses.length,
      remarkDutch: course.remarkDutch,
      remarkEnglish: course.remarkEnglish,
      showCourseName: course.showCourseName,
      id: new Date().getTime().toString()
    })
    this.updateMealType(mealType);    
  }

  editCourse(mealType: string, updatedCourse: Course) {
    const index = this.newDinner.courses.findIndex((course: Course) => {
      return course.id === updatedCourse.id
    })
    this.newDinner.courses[index] = updatedCourse
    this.updateMealType(mealType);
  }

  deleteCourse(mealType: string, courseId: string) {
    const index = this.newDinner.courses.findIndex((course: Course) => {
      return course.id === courseId
    });
    this.newDinner.courses.splice(index, 1);
    this.newDinner.courses = this.sortAndOrderArray(this.newDinner.courses);
    this.updateMealType(mealType);
  }

  moveCourse(direction: string, courseId: string, mealType: string) {
    const targetedIndex = this.newDinner.courses.findIndex((course: Course) => {
      return course.id === courseId
    })
    console.log(targetedIndex);
    const listpositionTartgetedIndex = this.newDinner.courses[targetedIndex].listPosition
    if(direction === 'down') {
      // EXCLUDE THE LAST ELEMENT
      if(targetedIndex + 1 === this.newDinner.courses.length) {
        // alert('you are already at the bottom')
        return
      } else {
        // SWAP THE LISTPOSITION WITH THE LP OF THE NEXT ELEMENT IN THE ARRAY
        this.newDinner.courses[targetedIndex].listPosition = this.newDinner.courses[targetedIndex + 1].listPosition
        this.newDinner.courses[targetedIndex + 1].listPosition = listpositionTartgetedIndex;
        this.newDinner.courses = this.sortAndOrderArray(this.newDinner.courses);
        this.updateMealType(mealType)
      }
    } else if(direction === 'up') {
      // EXCLUDE THE FIRST ELEMENT 
      if(targetedIndex === 0) {
        alert('you are already at the top');
        return;
      } else {
        // SWAP THE LISTPOSITION WITH THE LP OF THE PRECEDING ELEMENT IN THE ARRAY
        this.newDinner.courses[targetedIndex].listPosition = this.newDinner.courses[targetedIndex - 1].listPosition;
        this.newDinner.courses[targetedIndex - 1].listPosition = listpositionTartgetedIndex;
        this.newDinner.courses = this.sortAndOrderArray(this.newDinner.courses);
        this.updateMealType(mealType);
      }
    }
  }
  
  addFoodItem(mealType, courseId, foodItem: FoodItem) {
    let foodItemsArrayLength
    // GET THE LENGTH OF THE COURSE ARRAY
    this.newDinner.courses.forEach((course: Course) => {
      if(course.id === courseId) {
        console.log(course.foodItems.length);
        foodItemsArrayLength = course.foodItems.length;
      }
    })
    foodItem.id = new Date().getTime().toString();
    // USE THE LENGTH OF THE ARRAY AS THE LISTPOSITION FOR THE ADDED ELEMENT
    foodItem.listPosition = foodItemsArrayLength;
    this.newDinner.courses.forEach((course: Course) => {
      if(course.id === courseId) {
        if (!course.foodItems) {
          course.foodItems = [];
        } 
        course.foodItems.push(foodItem)
        course.foodItems = this.sortAndOrderArray(course.foodItems)
        // course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
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
        course.foodItems = this.sortAndOrderArray(course.foodItems);
        // course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
        // let i = 0
        //     course.foodItems.forEach((foodItem: FoodItem) => {
        //       foodItem.listPosition = i
        //       i = i + 1
        //     })
        this.updateMealType(mealType);
      }
    })
  }

  editFoodItem(mealType: string, courseId: string, updatedFoodItem: FoodItem) {
    console.log(mealType)
    this.newDinner.courses.forEach((course: Course) => {
      if(course.id === courseId) {
        const index = course.foodItems.findIndex((foodItem: FoodItem) => {
          return foodItem.id === updatedFoodItem.id;
        });
        course.foodItems[index] = updatedFoodItem;
        course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
        
        this.updateMealType(mealType)
      }
    })
  }

  moveFoodItem(mealType: string, direction: string, courseId: string, foodItemId: string) {
    console.log(mealType,direction, courseId,foodItemId);
    this.newDinner.courses.forEach((course: Course) => {
      if(course.id === courseId) {
        // console.log(course.nameEnglish);
        const index = course.foodItems.findIndex((foodItem: FoodItem) => {
          return foodItem.id === foodItemId
        })
        console.log(index);
        if(direction === 'down') {
          // SWAP THE LISTPOSTION OT THE TAGRETED ELEMENT WITH THE LISTPOSITION OF THE NEXT ELEMENT
          const foodItemsLength = course.foodItems.length;
          console.log(foodItemsLength);
          // EXCLUDE THE LAST ELEMENT OF MOVING DOWN
          if(index + 1 === foodItemsLength) {
            alert('Cant move down, you are already at the bottom');
            return;
          } else {
            // 1 GET THE LISTPOSITION OF THE TARGETED ELEMENT
            const targetedListPosistion = course.foodItems[index].listPosition;
            // 2 GET THE LISTPOSITION OF THE NEXT ELEMENT
            const previousListPosition = course.foodItems[index + 1].listPosition
            // 3 ASSIGN THE LISTPOSITION OF THE PREVIOUS ELEMENT TO THE TARGETED ELEMENT
            course.foodItems[index].listPosition = previousListPosition;
            // 4 ASSIGN THE LISTPOSITION OF THE TARGETED ELEMENT TO THE PREVIOUS ELEMENT
            course.foodItems[index + 1].listPosition = targetedListPosistion;
            // 5 SORT THE ARRAY
            course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
            // 6 ASSIGN CONSECUTIVE ASCENDING NUMBERS TO THE LISTPOSITIONS OF THE SORTED ARRAY
            // for(let i = 0; i < foodItemsLength; i++) {
            let i = 0
            course.foodItems.forEach((foodItem: FoodItem) => {
              foodItem.listPosition = i
              i = i + 1
            })
            // 7 UPDATE THE DATABASE
            this.updateMealType(mealType)
          }

        } else if(direction === 'up') {
          console.log(index);
          console.log('going up')
          // SWAP THE LISTPOSTION OT THE TAGRETED ELEMENT WITH THE LISTPOSITION OF THE PREVIOUS ELEMENT
          // 0 EXCLUDE FIRST ELEMENT OF MOVING UP
          if(index === 0) {
            alert('Cant move up you are already at the top');
            return
          } else {

          }
          // 1 GET THE LISTPOSITION OF THE TARGETED ELEMENT
          const targetedListPosistion = course.foodItems[index].listPosition
          console.log(targetedListPosistion);
          // 2 GET THE LISTPOSITION OF THE PRECEDING ELEMENT
          const precedingListPosition = course.foodItems[index - 1].listPosition;
          console.log(precedingListPosition);
          // 3 ASSIGN THE LISTPOSITION OF THE PRECEDING ELEMENT TO THE TARGETED ELEMENT
          course.foodItems[index].listPosition = precedingListPosition
          // 4 ASSIGN THE LISTPOSITION OT THE TARGETED ELEMENT TO THE NEXT ELEMENT
          course.foodItems[index - 1].listPosition = targetedListPosistion;
          // 5 SORT THE ARRAY

          course.foodItems = this.sortAndOrderArray(course.foodItems)

          // course.foodItems.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
          // 6 ASSIGN CONSECUTIVE ASCENDING NUMBERS TO THE LISTPOSITION OF THE ARRAY
          // let i = 0
          // course.foodItems.forEach((foodItem: FoodItem) => {
          //   foodItem.listPosition = i
          //   i = i + 1
          // })
          // 7 UPDATE THE DATABASE
          this.updateMealType(mealType)
        }
      }
    })
  }

  private sortAndOrderArray(array: any[]) {
    array.sort((a,b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a.listPosition) ? -1 : 0))
          // 6 ASSIGN CONSECUTIVE ASCENDING NUMBERS TO THE LISTPOSITION OF THE ARRAY
          let i = 0
    array.forEach((foodItem: FoodItem) => {
      foodItem.listPosition = i
       i = i + 1
    })
    return array
  }

  fetchMealTypeSnapshotChangesForLocalUse(mealType) {
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
      });
  }

  updateMealType(mealType) {
    this.newDinner.name = mealType
    this.db.collection(mealType).doc(this.newDinner.id).update(this.newDinner)
    .then(data => {
      this.uiService.showSnackbar('database updated', null, 5000)
    })
    .catch(err => {
      this.uiService.showSnackbar(err, null, 5000);
    });
  }

  initializeMealType(mealType) {
    console.log('initialize mealType');
    this.db.collection(mealType).valueChanges().subscribe(
      data => {
        console.log(data);
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
      console.log(data.length)
      if(data.length === 0) {
        this.initializeMealType(mealType);
      } else {
      }
    })
  }

  fetchMealTypeSnapshotChanges(mealType) {
    return this.db.collection(mealType)
    .snapshotChanges()
    .pipe(
      map((docArray: any) => {
        return docArray.map((doc: any) => {
          return {
            id: doc.payload.doc.id,
            courses: doc.payload.doc.data().courses.sort((a, b) => (a.listPosition > b.listPosition) ? 1 : ((b.listPosition > a. listPosition) ? -1 : 0)),
            // courses: doc.payload.doc.data().courses
          }
        })
      })
    )
  }


}
