import {Component} from '@angular/core';
import {Student} from '../student';
import {StudentsDataService} from "../../service/students-data.service";
import {Router} from "@angular/router";


@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  students: Student[];

  constructor(private studentDataService: StudentsDataService, private router: Router ) {
  }

  ngOnInit() {
    this.studentDataService.getStudentsData()
    //  .subscribe(students => this.students = students);
      .subscribe(students=>this.students=students,
        (error)=>{
        if(error.status===401){
          this.router.navigate(['login'],{queryParams:{source:'student'}});
        }
        });
  }


  averageGpa() {
    let sum = 0;
    if (Array.isArray(this.students)) {
      for (let student of this.students) {
        sum += student.gpa;
      }
      return sum / this.students.length;
    } else {
      return null;
    }

  }

  upQuantity(student: Student) {
    student.penAmount++;
  }

  downQuantity(student: Student) {
    if (student.penAmount > 0)
      student.penAmount--;
  }

  showDetail(student: Student){
    this.router.navigate(['/detail',student.id]);
  }
}
