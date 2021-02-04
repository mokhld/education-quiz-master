import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLoginDialogComponent } from './teacher-login-dialog.component';

describe('TeacherLoginDialogComponent', () => {
  let component: TeacherLoginDialogComponent;
  let fixture: ComponentFixture<TeacherLoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherLoginDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
