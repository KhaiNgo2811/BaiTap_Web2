import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-course-registration-reactive-component',
  standalone: false,
  styleUrl: './course-registration-reactive-component.css',
  templateUrl: './course-registration-reactive-component.html',
})
export class CourseRegistrationReactiveComponent {
  private readonly passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;

  public regForm: FormGroup = new FormGroup(
    {
      name: new FormControl('Ngô Hoàng Khải', [Validators.required, Validators.minLength(3), this.CustomerValidator.bind(this)]),
      email: new FormControl('khainhk24406h@st.uel.edu.vn',[Validators.required, Validators.email]),
      password: new FormControl('Abcdef1!', [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirmPass: new FormControl('Abcdef1!')
    }
  );
  setDefaultValues() {
    this.regForm.patchValue({
      name: 'Ngô Hoàng Khải',
      email: 'khainhk24406h@st.uel.edu.vn',
      password: 'Abcdef1!',
      confirmPass: 'Abcdef1!'
    });
  }
  onSubmit() {
    if (this.regForm.valid) {
      console.log('Dữ liệu đăng ký khóa học:', this.regForm.value);
      alert('Đăng ký khóa học thành công!\n' + JSON.stringify(this.regForm.value));
    } else {
      alert('Vui lòng điền đầy đủ thông tin và chọn khóa học!');
    }
  }
  CustomerValidator(control: AbstractControl):{ [key: string]: any } | null {
    const matchName = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);
    return matchName ? { 'invalidName': true } : null;
  }


}
