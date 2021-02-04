import { Component, OnInit } from '@angular/core';
import { TeacherLoginDialogComponent } from '../teacher-login-dialog/teacher-login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import {MatDividerModule} from '@angular/material/divider';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  db = firebase.default.firestore()
  quizNames =   [
    'Algebra-A',
    'Algebra-B',
    'Algebra-C',
    'Geometry-A',
    'Geometry-B',
    'Geometry-C',
    'Number-A',
    'Number-B',
    'Number-C',
    'Stats-A',
    'Stats-B',
    'Stats-C',
  ];

  //Create variables to bind the values

  quizType: any;
  quizQuestion: any;
  quizAnswer: any;
  quizOption1: any;
  quizOption2: any;
  quizOption3: any;
  quizOption4: any;



  
  constructor(private shareData: DataService, public dialog: MatDialog, public fAuth: AngularFireAuth,
    private route: Router,) { }


  ngOnInit(): void {
    console.log(this.quizNames)

  }

  testButton() {

    const newQuestion = {
      question: this.quizQuestion,
      answer: this.quizAnswer,
      option1: this.quizOption1,
      option2: this.quizOption2,
      option3: this.quizOption3,
      option4: this.quizOption4,
    }

    console.log(newQuestion)

    try {
      this.db.collection("Year 8 Quizzes").doc(this.quizType).collection("questions").add(newQuestion)
      
    } catch (error) {
      console.log(error.message)
    }

  }

  logout() {
    this.fAuth.signOut();
     this.route.navigate(['']);
 }

}
