import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { StudentPortalComponent } from './student-portal/student-portal.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentQuizComponent } from './student-quiz/student-quiz.component';
import { StudentPerformanceComponent } from './student-performance/student-performance.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { ResultComponent } from './result/result.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'teacher-dashboard', 
  component: TeacherDashboardComponent },

  {
    path: 'student',
    component: StudentPortalComponent,
    children: [
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'quiz', component: StudentQuizComponent },
      { path: 'performance', component: StudentPerformanceComponent },
      { path: ':ID', component: TakeQuizComponent },
      { path: 'performance/results/:QuizID', component: ResultComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
