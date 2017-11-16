import {Component, Input} from '@angular/core';
import {Student} from '../student';
import {Course} from '../course';
import { Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {StudentsDataService} from "../../service/students-data.service";


@Component({
 selector: 'course-list',
 templateUrl: './course-list.component.html',
 styleUrls:['./course-list.component.css']
})
export class CourseListComponent {
  students: Student[];
  constructor(private router: Router,
              private authenticationService: AuthenticationService,private studentDataService: StudentsDataService) {
  }

  @Input() count:number;
  @Input('enrolledCourse') courses:Course;
  ngOnInit() {

  }

}
