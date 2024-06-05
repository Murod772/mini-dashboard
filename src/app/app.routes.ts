import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { authGuard } from './guards/auth.guard';
import { TicketDetailComponent } from './pages/tickets/ticket-detail/ticket-detail.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tickets',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'profile/:userID',
    component: ProfileComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Profile' },
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Tickets' },
  },
  {
    path: 'ticket/:ticketID',
    component: TicketDetailComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Ticket Details' },
  },
  // {
  //   path: 'tickets', component: TicketsComponent, canActivate: [authGuard], data: { breadcrumb: 'Tickets' },
  //   children: [
  //     { path: ':ticketID', component: TicketDetailComponent, data: { breadcrumb: 'Ticket Details' } }
  //   ]
  // }

];
