import {Component,ElementRef, Input, ViewChild} from '@angular/core';
import {Student} from '../student';
import {Router} from "@angular/router";
import {StudentsDataService} from "../../service/students-data.service";

@Component({
  selector: 'students-add',
  templateUrl: './students.add.component.html',
  styleUrls: ['./students.add.component.css']
})
export class StudentsAddComponent {
  student: any = {};
  students: Student[];
  constructor(private studentDataService: StudentsDataService, private router: Router) {
  };

  ngOnInit() {

    this.studentDataService.getStudentsData()
    //  .subscribe(students => this.students = students);
      .subscribe(students=>this.students=students,
        (error)=>{
          if(error.status===401){
            this.router.navigate(['login'],{queryParams:{source:'student'}});
          }
        });
    this.student = new Student();this.student = new Student();
  }

  upQuantity(student: Student) {
    student.penAmount++;
  }

  downQuantity(student: Student) {
    if (student.penAmount > 0)
      student.penAmount--;
  }
  @ViewChild('fileInput') inputEl: ElementRef;
  addStudent(student: Student) {
    let result: Student;
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;

    this.studentDataService.addStudent(student,inputEl.files.item(0))
      .subscribe(resultStudent => {
        result = resultStudent
        if (result != null){
          this.router.navigate(['/list']);
        }else{
          alert("Error in adding the student");
        }
      });
  }

  onFileChange(event, student: any) {
    var filename = event.target.files[0].name;
    console.log(filename);
    student.image = filename;
    student.file = event.target.files[0];
  }
}
