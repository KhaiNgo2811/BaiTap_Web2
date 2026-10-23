import { Component } from '@angular/core';

@Component({
  selector: 'app-component-interaction',
  standalone: false,
  styleUrl: './component-interaction.css',
  templateUrl: './component-interaction.html',
})
export class ComponentInteraction {
  // Data sent down to the child via @Input()
  dataToChild: string = 'Hello from Parent';

  // Data received from the child via @Output()
  dataFromChild: string | null = null;

  handleMessage(message: string): void {
    this.dataFromChild = message;
  }
}
