import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatchService} from './domain/services/match.service';
import {MatchState} from './domain/enums/match_state';
import {StartComponent} from './components/start/start.component';
import {QuestionComponent} from './components/question/question.component';
import {EndComponent} from './components/end/end.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartComponent, QuestionComponent, EndComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly matchService = inject(MatchService);
  protected matchState = this.matchService.matchState;

  protected startGame(): void {
    this.matchService.play();
  }

  protected answerQuestion(answer: number): void {
    this.matchService.validate(answer);
  }

}
