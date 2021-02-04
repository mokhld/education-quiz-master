import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  constructor(public fAuth: AngularFireAuth) {}

  //Id of current logged in Student
  searchByStudent = firebase.default.auth().currentUser.uid;
  db = firebase.default.firestore();

  //Student info variable assignment
  studentName: string;
  studentTeacher: string;
  studentClass: string;
  studentPrimaryKey: string;

  ngOnInit(): void {
    //Get Student Name
    this.db
      .collection('Students')
      .where('StudentID', '==', this.searchByStudent)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.studentName = doc.data().FullName;
          this.studentTeacher = doc.data().Teacher;
          this.studentClass = doc.data().Class;
          this.studentPrimaryKey = doc.data().PrimaryKey;
        });
      });
  }
}
