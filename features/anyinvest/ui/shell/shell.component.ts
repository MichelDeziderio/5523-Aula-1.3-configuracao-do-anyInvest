import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {

  isShowMenu = false;

  constructor(public auth: AuthService, private router: Router) { }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
