import { LoggedGuard } from './modules/shared/guards/logged.guard';
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { ProfileComponent } from './modules/main/pages/profile/profile.component';
import { PokemonsComponent } from './modules/main/pages/pokemons/pokemons.component';
import { BooksComponent } from './modules/main/pages/books/books.component';
import { HomeComponent } from './modules/main/pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/main/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedGuard],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'books',
            component: BooksComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'pokemons',
            component: PokemonsComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'profile',
            component: ProfileComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
