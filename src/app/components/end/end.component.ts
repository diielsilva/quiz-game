import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-end',
  standalone: true,
  imports: [],
  templateUrl: './end.component.html',
  styleUrl: './end.component.css'
})
export class EndComponent {
  public readonly resetGameEvent = output<void>();
  public readonly hasRemainingAttempts = input.required<boolean>();

  protected resetGame(): void {
    this.resetGameEvent.emit();
  }
}
