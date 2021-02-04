import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TeacherLoginDialogComponent } from '../teacher-login-dialog/teacher-login-dialog.component';

export class Student {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  dummy = [];

  public student: Student = new Student();
  

  constructor(
    private route: Router,
    public fAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(TeacherLoginDialogComponent);
  }

  async login() {
    try {
      //Firebase authenticates the users email and password
      let r = await this.fAuth.signInWithEmailAndPassword(
        this.student.email,
        this.student.password
      );
      if (r) {
        console.log(firebase.default.auth().currentUser.uid);

        console.log('Successfully logged in!');
        //If student route to Student Portal
        this.route.navigate(['student']);

        //Show success prompt
        this.snackBar.open('Login Succesful', '', {
          duration: 4000,
        });
      }
    } catch (err) {
      console.error(err);
      // Prompt any error messages
      this.snackBar.open(err.message, '', {
        duration: 4000,
      });
    }
  }

  // generateStudents() {
  //   let teachers = [
  //     'Ms Hamid',
  //     'Mrs Alexander-Stafford',
  //     'Mr Yeboah',
  //     'Mr Azim',
  //   ];

  //   let x = 0;
  //   while (x != 10) {
  //     let teacher = teachers[Math.floor(Math.random() * teachers.length)];

  //     let student = {
  //       FullName: 'Student ' + [x],
  //       Teacher: teacher,
  //       Class: '8.' + [x],
  //       YearGroup: '8',
  //       PrimaryKey: 'ST' + Math.floor(1000 + Math.random() * 9000),
  //       Email: 'student' + [x] + '@gmail.com',
  //       Password: '123456',
  //       StudentID: 'student' + [x] + Math.floor(Date.now() / 1000),
  //     };

  //     this.dummy.push(student);

  //     x++;
  //   }
  //     console.log(this.dummy)

  //     this.addDummy()
  // }

  // addDummy(){

  //   let db = firebase.firestore();
  //       try {

  //         for (let i=0; i<this.dummy.length; i++){

  //           this.fAuth.createUserWithEmailAndPassword(
  //             this.dummy[i].Email,
  //             this.dummy[i].Password
  //           )
  //           db.collection('Students').add(this.dummy[i]);

  //         }
      
  //   } catch (error) {

  //     console.log(error.message)
      
  //   }

  // }
}
