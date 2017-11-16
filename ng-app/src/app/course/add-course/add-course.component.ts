import { Component, OnInit } from '@angular/core';
import {Course} from '../../students/course';
import {Http} from '@angular/http';
import {CourseServerService} from '../../service/course-server.service';
import {Router} from '@angular/router';
import {StudentsDataService} from '../../service/students-data.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(private courseService:CourseServerService,private router:Router,private studentDataService: StudentsDataService) { }
  course:any = {};
  ngOnInit() {
    this.studentDataService.getStudentsData()
      .subscribe(result => {
          // Handle result
        },
        (error) =>{
          if(error.status === 401){
            this.router.navigate(['login'],{queryParams:{source:'add-course'}});
          }
        }
      );

  }

  addCourse(course:Course){
    this.courseService.addCourse(course)
      .subscribe(result =>{
        if (result != null){
          this.router.navigate(['/courses'],{queryParams:{result:'addSuccess'}})
        }else{
          alert('Error in adding the student');
        }
      })
  }
}
