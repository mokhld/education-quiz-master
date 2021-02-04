import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import firebase from "firebase/app";


@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.scss']
})
export class StudentQuizComponent implements OnInit {

  db = firebase.firestore();
  algebraQuizzes = [];
  geometryQuizzes = [];
  numberQuizzes = [];
  statsQuizzes = [];
  message: string;

  constructor
  (
    private router: Router,
    private shareData: DataService
  ) { }

  ngOnInit() {

    if(!this.algebraQuizzes || !this.algebraQuizzes.length){

          // Try-Catch function reading data from Firestore
    try {
      // Access quizzes for students in Year 8
      this.db.collection("Students").where("YearGroup", "==", "8").onSnapshot(snapshot => {
        snapshot.docs.forEach (() => {
          // Filter through Firestore to return the different quizzes available
          this.db.collection('Year 8 Quizzes').get().then (quizDoc => {
            quizDoc.docs.forEach (quizOption => {

              if (quizOption.id.includes('Algebra')){
                  // Add the quizzes for Algebra in array to iterate through in the front-end
                  this.algebraQuizzes.push(
                    {
                      ID: quizOption.id
                    }
                  );

                  console.log('Student Algebra Quizes: ' + ' ' + this.algebraQuizzes)
              }
              if (quizOption.id.includes('Geometry')){
                  // Add the quizzes for Algebra in array to iterate through in the front-end
                  this.geometryQuizzes.push(
                    {
                      ID: quizOption.id
                    }
                  );

                  console.log('Student Geometry Quizes: ' + ' ' + this.geometryQuizzes)
              }
              if (quizOption.id.includes('Number')){
                  // Add the quizzes for Algebra in array to iterate through in the front-end
                  this.numberQuizzes.push(
                    {
                      ID: quizOption.id
                    }
                  );
                  console.log('Student Number Quizes: ' + ' ' + this.numberQuizzes)
              }
              if (quizOption.id.includes('Stats')){
                  // Add the quizzes for Algebra in array to iterate through in the front-end
                  this.statsQuizzes.push(
                    {
                      ID: quizOption.id
                    }
                  );

                  console.log('Student Stats Quizes: ' + ' ' + this.statsQuizzes)
              }
            })
          })
        })
      })
      
    } catch (error) {
      console.log(error.message);
    }

    }
  }

}