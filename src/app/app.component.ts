import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'click-project';
  clicks: number = 0;

  incrementClicks() {
    this.clicks++;
    const scaleFactor = 1 + (Math.floor(this.clicks / 10) * 0.1);
    (document.querySelector('.hamster-button') as HTMLElement)?.style.setProperty('--scale-factor', scaleFactor.toString());
  }
}
