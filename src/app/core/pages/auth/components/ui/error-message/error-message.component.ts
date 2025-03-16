import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
  @Input() inputControl!: AbstractControl | null;
}
