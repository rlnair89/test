import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'parcel-system';
  selectedMenu: string = 'Home'; // Keep track of selected menu item
  constructor(private router: Router) {}

  selectMenu(menu: string) {
    this.selectedMenu = menu; // Set selected menu item
  }

goToDepartments() {
  this.router.navigate(['/departments']);
}
}
