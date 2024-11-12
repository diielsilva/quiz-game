import {Component, input, output} from '@angular/core';
import {Question} from '../../domain/models/question';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  public readonly question = input.required<Question>();
  public readonly answerQuestionEvent = output<number>();

  protected answerQuestion(answer: number): void {
    this.answerQuestionEvent.emit(answer);
  }

}
