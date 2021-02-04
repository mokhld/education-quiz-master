import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  db = firebase.default.firestore();
  resultBreakdown = [];
  searchByStudent = firebase.default.auth().currentUser.uid;
  score: any;
  resultQuizName: any


  constructor(private shareData: DataService, private router: Router) { }

  ngOnInit(): void {

    try {
      for (let i=0; i<this.shareData.quizOptions.length; i++){
        if(this.router.url.includes(this.shareData.quizOptions[i])){
          // console.log('You are viewing the quiz results for: ' + this.shareData.quizOptions[i])
  
          //Search for the results of the student
          this.db.collection('Students').where('StudentID', '==', this.searchByStudent).onSnapshot(snapshot => {
            snapshot.docs.forEach (doc => {
              this.db.collection('Students').doc(doc.id).collection('Results').doc(this.shareData.quizOptions[i]).get().then(snap => {
                //Get quiz name of the results being displayed
                this.resultQuizName = this.shareData.quizOptions[i]

                //Declare variable to work through results array 
                let x = 0;
                while (x != 10){
                  this.resultBreakdown.push(
                    {
                      Q: snap.data()[x].Question,
                      A: snap.data()[x].Answer,
                      M: snap.data()[x].Mark
                    }
                  )
                  x++
                }

                this.score = snap.data()[10].Score

                console.log(this.resultBreakdown)
              })
            })
          })
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

}
