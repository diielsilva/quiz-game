import {Component, output, OutputEmitterRef} from '@angular/core';

@Component({
  selector: 'app-end',
  standalone: true,
  imports: [],
  templateUrl: './end.component.html',
  styleUrl: './end.component.css'
})
export class EndComponent {
  public readonly resetGameEvent: OutputEmitterRef<void> = output<void>()

  protected resetGame(): void {
    this.resetGameEvent.emit();
  }
}
