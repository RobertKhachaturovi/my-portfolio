import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  name = 'Robert Khachaturovi';
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });

    this.currentRoute = this.router.url;
  }

  scrollToSkills() {
    if (this.currentRoute !== '/' && this.currentRoute !== '/home') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollToElement('skills');
        }, 100);
      });
    } else {
      this.scrollToElement('skills');
    }
  }

  private scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  isOnHomePage(): boolean {
    return this.currentRoute === '/' || this.currentRoute === '/home';
  }
}
