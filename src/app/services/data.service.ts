import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public quizOptions = 
  [
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

 message: string;
 showStudent: string;

  constructor() { }

  //Set the variable selectedQuiz with users selection
  setSelectedQuiz(data){
    this.message = data
  }
  //Get the value of the selectedQuiz
  getSelectedQuiz(){
    return this.message
  }


  // Set the variable selectedStudent with student name selected
  setSelectedStudent(studentname){
      this.showStudent = studentname
  }

  getSelectedStudent(){
    return this.showStudent
  }


}
