import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { TaskListComponent } from './app/components/task-list/task-list.component';
import { NavBarComponent } from './app/components/nav-bar/nav-bar.component';
import { AuthGuard } from './app/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavBarComponent],
  template: `
    <app-nav-bar></app-nav-bar>
    <router-outlet></router-outlet>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});