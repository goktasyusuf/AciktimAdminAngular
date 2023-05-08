import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const button = document.querySelector('.aside_button');
    const main = document.querySelector('.main')
    if (!this.isSidebarOpen) 
    {
      button.classList.add('open');
      main.classList.add('show_main');
    } 
    else 
    {
      button.classList.remove('open');
      main.classList.remove('show_main');
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 768) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
  }
}
