import {computed, Injectable, signal} from '@angular/core';
import {data} from '../data/data';
import {Match} from '../models/match';
import {Question} from '../models/question';
import {MatchState} from '../enums/match_state';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matchSignal = signal<Match>(this.create());
  public matchState = computed(() => this.matchSignal());

  public validate(answer: number) {
    const match = this.matchSignal();
    const isCorrect = answer === match.selected.answer;

    if (isCorrect) {
      const remaining = this.removeSelected(this.matchSignal().selected);
      const hasRemainingQuestions = remaining.length > 0;

      if (hasRemainingQuestions) {
        const selected = this.selectRandom(remaining);

        this.matchSignal.set({
          attempts: match.attempts,
          selected: selected,
          remaining: remaining,
          state: match.state
        });

        return;
      }

      this.matchSignal.set({
        attempts: match.attempts,
        selected: match.selected,
        remaining: match.remaining,
        state: MatchState.FINISHED
      });

      return;
    }

    const attempts = match.attempts - 1;
    const hasRemainingAttempts = attempts > 0;

    if (hasRemainingAttempts) {
      this.matchSignal.set({
        attempts: attempts,
        selected: match.selected,
        remaining: match.remaining,
        state: match.state
      });

      return;
    }

    this.matchSignal.set({
      attempts: attempts,
      selected: match.selected,
      remaining: match.remaining,
      state: MatchState.FINISHED
    });
  }

  public play(): void {
    const match = this.create();
    match.state = MatchState.PLAYING;

    this.matchSignal.set(match);
  }

  private create(): Match {
    const lives = 5;
    const remaining: Question[] = this.parseRawData();
    const selected: Question = this.selectRandom(remaining);
    const state: MatchState = MatchState.INITIAL;

    return {attempts: lives, selected, remaining, state};
  }

  private parseRawData(): Question[] {
    const rawData = data;
    const questions: Question[] = [];

    rawData.forEach(data => {
      const question: Question = {
        title: data.question,
        alternatives: data.alternatives,
        answer: data.answerIndex
      };

      questions.push(question);
    });

    return questions;
  }

  private selectRandom(questions: Question[]): Question {
    const index = Math.floor(Math.random() * questions.length);

    return questions[index];
  }

  private removeSelected(selected: Question): Question[] {
    const remaining: Question[] = [];
    const match = this.matchSignal();

    match.remaining.forEach(question => {
      const isSelected = selected === question;

      if (!isSelected) {
        remaining.push(question);
      }

    });

    return remaining;
  }
}
