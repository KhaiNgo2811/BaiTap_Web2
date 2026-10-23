import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-two-way-component',
  standalone: false,
  styleUrl: './binding-two-way-component.css',
  templateUrl: './binding-two-way-component.html',
})
export class BindingTwoWayComponent {
  public hsa: number = 5
  public hsb: number = 10
  public hsc: number = 5
  public result: string = "Kết quả ở đây"

  giaiPtb2() {
    if (this.hsa === 0) {
      if (this.hsb === 0 && this.hsc === 0) {
        this.result = 'Vô số nghiệm';
      } else {
        this.result = 'Vô nghiệm';
      }
    } else {
      const delta = this.hsb * this.hsb - 4 * this.hsa * this.hsc;
      if (delta < 0) {
        this.result = 'Vô nghiệm';
      } else if (delta === 0) {
        const x = -this.hsb / (2 * this.hsa);
        this.result = `Nghiệm kép: x = ${x}`;
      } else {
        const x1 = (-this.hsb + Math.sqrt(delta)) / (2 * this.hsa);
        const x2 = (-this.hsb - Math.sqrt(delta)) / (2 * this.hsa);
        this.result = `Hai nghiệm phân biệt: x1 = ${x1}, x2 = ${x2}`;
      }
    }
  }

  ptMoi() {
    this.hsa = 0;
    this.hsb = 0;
    this.hsc = 0;
    this.result = "Kết quả ở đây";
  }
}