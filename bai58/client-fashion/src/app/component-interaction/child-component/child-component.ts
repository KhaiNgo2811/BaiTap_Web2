import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-component',
  standalone: false,
  styleUrl: './child-component.css',
  templateUrl: './child-component.html',
})
export class ChildComponent {
  // Data from parent (Parent -> Child)
  @Input() parentData: string = '';

  // Event to parent (Child -> Parent)
  @Output() notifyParent = new EventEmitter<string>();

  sendToParent(): void {
    this.notifyParent.emit('Hello from Child');
  }
}
