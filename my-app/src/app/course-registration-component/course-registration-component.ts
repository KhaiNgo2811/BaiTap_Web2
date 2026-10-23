import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseRegistration } from '../classes/course-registration-component';

@Component({
  selector: 'app-course-registration-component',
  standalone: false,
  styleUrl: './course-registration-component.css',
  templateUrl: './course-registration-component.html',
})
export class CourseRegistrationComponent {

//   onSubmit(form: NgForm) {
//     if (form.valid) {
//     let course=form.value
//     alert(`Đăng ký khóa học thành công!\nTên: ${course.name}\nEmail: ${course.email}\nKhóa học: ${course.course}`);
//     form.reset();
//     } else {
//       alert('Vui lòng điền đầy đủ thông tin và chọn khóa học!');
//     }
//   }
  courseModel = new CourseRegistration();
  onSubmit() {
    let infor = this.courseModel.getInfor();
    console.log('Dữ liệu đăng ký khóa học:', this.courseModel.getInfor());
    alert('Đăng ký khóa học thành công!\n' + infor);
  }
}
