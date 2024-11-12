import {Component, output, OutputEmitterRef} from '@angular/core';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  public readonly startGameEvent: OutputEmitterRef<void> = output<void>();

  protected startMatch(): void {
    this.startGameEvent.emit();
  }

}
