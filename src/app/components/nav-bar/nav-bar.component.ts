import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',  
  styleUrls: ['./nav-bar.component.css']  
})
export class NavBarComponent {
  constructor(public authService: AuthService) {}

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}
