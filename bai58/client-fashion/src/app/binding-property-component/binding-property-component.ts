import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-property-component',
  standalone: false,
  styleUrl: './binding-property-component.css',
  templateUrl: './binding-property-component.html',
})
export class BindingPropertyComponent {
  public isDisabled: boolean = false;
  public name:string = "Ngô Hoàng Khải"
  public email: string = "khainhk24406h@st.uel.edu.vn"
  public nameid: string ="nameid"
  public emailid: string ="emailid"
  public hello: string ="Helloo các con vợ!!"
  }