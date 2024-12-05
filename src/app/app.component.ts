import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

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
    const hamster = document.querySelector('.hamster-button') as HTMLElement;
    hamster?.style.setProperty('--scale-factor', scaleFactor.toString());

    if (this.clicks % 33 === 0) {
      this.explodeHamster(scaleFactor);
    }
  }

  explodeHamster(scaleFactor: number) {
    const hamster = document.querySelector('.hamster-button') as HTMLElement;
    const currentScaleFactor = getComputedStyle(hamster).getPropertyValue('--scale-factor') || '1';

    // Create explosion particles
    let particleCount = 30;
    const container = document.querySelector('main') as HTMLElement;
    const particles: HTMLElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('img');
      particle.src = 'assets/hamster.png';
      particle.className = 'explosion-particle';
      particle.style.width = '50px';
      particle.style.height = '50px';
      particle.style.position = 'absolute';

      const rect = hamster.getBoundingClientRect();
      particle.style.left = `${rect.left + rect.width / 2}px`;
      particle.style.top = `${rect.top + rect.height / 2}px`;

      container.appendChild(particle);
      particles.push(particle);

      // Animate each particle
      gsap.to(particle, {
        duration: 1.5,
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 500,
        rotation: Math.random() * 720 - 360,
        opacity: 0,
        ease: 'power2.out',
        onComplete: () => {
          // Reverse animation
          gsap.to(particle, {
            duration: 1,
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            ease: 'power2.in',
            onComplete: () => {
              particle.remove();
              if (i === particleCount - 1) {
                particleCount=particleCount+10;
                // Bring back the original hamster
                gsap.to(hamster, {
                  duration: 0.01,
                  opacity: 1,
                  scale: currentScaleFactor,
                  ease: 'bounce.out',
                  onComplete: () => {
                    hamster?.style.setProperty('--scale-factor', scaleFactor.toString());
                  }
                });
              }
            }
          });
        }
      });
    }

    // Hide original hamster temporarily
    gsap.to(hamster, {
      opacity: 0,
      scale: 0
    });
  }
}
