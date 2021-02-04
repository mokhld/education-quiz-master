import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss'],
})
export class TakeQuizComponent implements OnInit {
  db = firebase.default.firestore();
  searchByStudent = firebase.default.auth().currentUser.uid;
  quizName: string;
  quizQuestions = [];
  selectedResponse = [];
  quizResponse: string;
  correctAnswer = 0;
  score: any;

  constructor(
    private shareData: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.quizQuestions = [];

    try {
      //Iterate over the quizOptions array to match Router path
      for (let i = 0; i < this.shareData.quizOptions.length; i++) {
        if (this.router.url.includes(this.shareData.quizOptions[i])) {
          //Let the quizName variable = the matched value from array
          this.quizName = this.shareData.quizOptions[i];
          console.log(this.shareData.quizOptions[i]);

          try {

            this.db.collection('Year 8 Quizzes').doc(this.shareData.quizOptions[i]).collection('questions').get()
            .then((snapshot) => {
              snapshot.docs.forEach((x) => {
                //Extract the data needed for the quiz and push into the quizQuestions array
                this.quizQuestions.push({
                  Question: x.data().question,
                  Answer: x.data().answer,
                  Option1: x.data().option1,
                  Option2: x.data().option2,
                  Option3: x.data().option3,
                  Option4: x.data().option4,
                });
                console.log(this.quizQuestions);
              });
            });

            //Load the quiz
            //Search Students based on Year group
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }



  //Get Students Answer for the Quiz

  getResponse(event, loadQuiz) {
    try {
      this.quizQuestions.forEach((element) => {
        //Target the question being asked
        if (loadQuiz.Question == element.Question) {
          //Check if the Students response is the correct answer
          if (this.quizResponse == element.Answer) {
            //If Correct then Mark as Correct and push into Array
            this.selectedResponse.push({
              Question: loadQuiz.Question,
              Answer: this.quizResponse,
              Mark: 'Correct',
            });
          } else {
            //If Incorrect then Mark as Incorrect and push into Array
            this.selectedResponse.push({
              Question: loadQuiz.Question,
              Answer: this.quizResponse,
              Mark: 'Incorrect',
            });
          }
        }
      });

      console.log(Object.assign({}, this.selectedResponse));
    } catch (error) {
      console.log(error.message);
    }
  }

  //Add Quiz results to Database

  submitQuiz() {
    try {
      //Get score percentage add to responses
      for (let i = 0; i < this.selectedResponse.length; i++) {
        if (this.selectedResponse[i].Mark == 'Correct') {
          this.correctAnswer++;
        }
      }

      //Calculate percentage of the score
      this.score = (this.correctAnswer / 10) * 100 + '%';

      this.selectedResponse.push({ Score: this.score });

      console.log('Responses with score: ' + this.selectedResponse);

      //Push the results into the db
      this.db
        .collection('Students')
        .where('StudentID', '==', this.searchByStudent)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.db
              .collection('Students')
              .doc(doc.id)
              .collection('Results')
              .doc(this.quizName)
              .set(Object.assign({}, this.selectedResponse));
          });
        });
      //Alert if quiz has been completed
      this.snackBar.open('Quiz successfully submitted', '', {
        duration: 4000,
      });

      this.router.navigate(['student/performance']);
    } catch (error) {
      console.log(error.message);
    }
  }
}
