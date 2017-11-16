import { Component, OnInit } from '@angular/core';
import {Course} from '../../students/course';
import {CourseServerService} from '../../service/course-server.service';
import {ActivatedRoute, Params,Router} from '@angular/router';
import {StudentsDataService} from '../../service/students-data.service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {

  courses:Course[];
  constructor(private courseService:CourseServerService,private route:ActivatedRoute,private router:Router,private studentDataService: StudentsDataService) { }

  result:string;
  ngOnInit() {
    this.studentDataService.getStudentsData()
      .subscribe(result => {
          // Handle result
        },
        (error) =>{
          if(error.status === 401){
            this.router.navigate(['login'],{queryParams:{source:'list-course'}});
          }
        }
      );
    this.route.queryParams
      .subscribe((params : Params) => {
        this.result = params['result'];
      }
      );

    this.courseService.getCourse()
      .subscribe(courses=>this.courses = courses);
  }


}
