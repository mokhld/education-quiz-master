import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-portal',
  templateUrl: './student-portal.component.html',
  styleUrls: ['./student-portal.component.scss']
})
export class StudentPortalComponent implements OnInit {

  constructor( private route: Router,
    public fAuth: AngularFireAuth,) { }

  ngOnInit(): void {

    this.route.navigate(['student/dashboard'])
    
  }

  logout() {
     this.fAuth.signOut();
      this.route.navigate(['']);
  }

}
