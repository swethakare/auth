import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FlightComponent } from './pages/flight/flight.component';
import { AuthGuard } from './pages/shared/auth.guard';
import { SuccessComponent } from './pages/success/success/success.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'flight',
        component: FlightComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'success',
        component: SuccessComponent,
        canActivate: [AuthGuard]
    }
];
