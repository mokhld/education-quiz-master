import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private firestore: AngularFirestore, public fAuth: AngularFireAuth) {}

  //Create CRUD service for Firebase data manipulation
  create_NewAccount(record) {
    return this.firestore.collection('Students').add(record);
  }
 
  read_Account() {
    return this.firestore.collection('Students').snapshotChanges();
  }
 
  update_Account(recordID,record){
    this.firestore.doc('Students/' + recordID).update(record);
  }
 
  delete_Account (record_id) {
    this.firestore.doc('Students/' + record_id).delete();
  }

}
