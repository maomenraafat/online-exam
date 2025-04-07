import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exam } from '../../../interfaces/exam';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { Question } from '../../../interfaces/question';

@Component({
  selector: 'app-exam-card',
  imports: [ModalComponent],
  templateUrl: './exam-card.component.html',
  styleUrl: './exam-card.component.scss',
})
export class ExamCardComponent {
  @Input() exam!: Exam;

  @Output() fireGetExamId: EventEmitter<string> = new EventEmitter();
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
  handleId(id: string) {
    this.fireGetExamId.emit(id);
  }

  handleStart() {}
}
