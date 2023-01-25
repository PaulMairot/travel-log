import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'modify-place',
    loadChildren: () => import('./modify-place/modify-place.module').then( m => m.ModifyPlacePageModule)
  },
  {
    path: 'modify-trip',
    loadChildren: () => import('./modify-trip/modify-trip.module').then( m => m.ModifyTripPageModule)
  },
  {
    path: 'add-place',
    loadChildren: () => import('./add-place/add-place.module').then( m => m.AddPlacePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
