import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Exhibition } from '../exhibitions/exhibition.model';
import { convertSnaps } from '../utils/db.utils';

import { AngularFireStorage } from '@angular/fire/storage';
import { concatMap, finalize, catchError, last, tap, map } from 'rxjs/operators';
import { NewExhibition, NewImage } from './new-exhibition.model';

@Injectable({
    providedIn: 'root'
})
export class NewExhibitionsService {

    

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore) {}

  

    getExhibitions() {
        return this.db.collection('exhibitions', ref => ref.orderBy('startExhibition', "desc"))
        
        .snapshotChanges()
        .pipe(
            map(snaps => convertSnaps<Exhibition>(snaps))
        );
    }

    getExhibitionById(id: string) {
        return this.db
            .collection('exhibitions')
            
            .doc(id)
            .ref
            .get()
            .then((doc: any) => {
                if(doc) {
                    console.log(doc.data())
                    const exhibition: NewExhibition = {
                        id: id,
                        ...doc.data()
                    }
                    return exhibition
                } else {
                    console.log('doc not found')
                }
            })
            
    }
    getExhibitionByIdAsObservable(id: string) {
        return this.db
        .collection('exhibitions')
        .doc(id)
        .get()

    }

    getAllImagePaths() {
        return this.db
            .collection('exhibitions')
            .snapshotChanges()
            .pipe(
                map (snaps => convertSnaps<Exhibition>(snaps))
            )
            // .subscribe((exhibitions: Exhibition[]) => {
            //     console.log(exhibitions);
            //     exhibitions.forEach((exhibition:Exhibition) => {
            //         exhibition.images.forEach((image: NewImage) => {
            //             filePaths.push(image.filePath);
            //         })
            //     })
            //     console.log(filePaths)
            //     return filePaths
            // })
    }

    getFilePathsByExhibitionId(exhibitionId) {
        return this.db.collection('exhibitions').get(exhibitionId)      
    }

    addImageToBucket(file: File, folder: string) {
        const filePath = `exhibitions/${folder}/${file.name}`
        const task = this.storage.upload(filePath, file);
        return task.snapshotChanges()
            .pipe(
                last(),
                concatMap(() => 
                    this.storage.ref(filePath).getDownloadURL()
                ) 
            )
    }

    addExhibitionToDb(exhibition: Exhibition) {
        // localStorage.setItem('exhibition', JSON.stringify(exhibition))
        return this.db.collection('exhibitions').add(exhibition)
    }

    updateExhibition(exhibitionId: string, exhibition: Exhibition) {
        return this.db.collection('exhibitions').doc(exhibitionId).set(exhibition)
    }

    addImageToExhibition(image: NewImage) {
        
    }
    deleteExhibition(exhibitionId: string) {
        return this.db.collection('exhibitions').doc(exhibitionId).delete()
    }

}
