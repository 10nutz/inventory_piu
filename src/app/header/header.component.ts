import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent {
  constructor(private router: Router){}

  isActive = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  goToInventory(): void{
    this.router.navigate(['inventory'])
  }

  goToContact(): void{
    this.router.navigate(['contact'])
  }
}
