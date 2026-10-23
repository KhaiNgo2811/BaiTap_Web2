import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-event-component',
  standalone: false,
  styleUrl: './binding-event-component.css',
  templateUrl: './binding-event-component.html',
})
export class BindingEventComponent {
  public hsa: number = 5
  public hsb: number = 10
  public result: string = "Kết quả ở đây"

  giaiPhuongTrinh() {
    if (this.hsa === 0) {
      this.result = this.hsb === 0 ? 'Vô số nghiệm' : 'Vô nghiệm';
    } else {
      this.result = (-this.hsb / this.hsa).toString();
    }
  }

  ptMoi() {
    this.hsa = 0;
    this.hsb = 0;
    this.result = "Kết quả ở đây";
  }

  giaiPtb1(a:string, b:string) {
    this.hsa = parseFloat(a);
    this.hsb = parseFloat(b);
    if(this.hsa===0&&this.hsb===0)
    {
      this.result = "Vô số nghiệm";
    } else if(this.hsa===0&&this.hsb!==0)
    {
      this.result = "Vô nghiệm";
    } else {
      let x = -this.hsb/this.hsa;
      this.result = "x = " + x.toString();
    }
  }
}
