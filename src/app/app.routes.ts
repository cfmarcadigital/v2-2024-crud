import { Routes } from '@angular/router';
import { IndexComponent } from './ticket/index/index.component';
import { CreateComponent } from './ticket/create/create.component';
import { EditComponent } from './ticket/edit/edit.component';
import { ViewComponent } from './ticket/view/view.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: 'ticket', redirectTo: 'ticket/index', pathMatch: 'full' },
    { path: 'ticket/index', component: IndexComponent, canActivate: [authGuard] },
    { path: 'ticket/create', component: CreateComponent },
    { path: 'ticket/:ticketId/edit', component: EditComponent },
    { path: 'ticket/:ticketId/view', component: ViewComponent },

    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/login', component: LoginComponent }
];
