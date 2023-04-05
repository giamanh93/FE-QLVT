import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers/default-layout';
@NgModule({
  imports: [
      RouterModule.forRoot([
          {
            path: '',
            redirectTo: 'admin',
            pathMatch: 'full',
          },
          {
              path: '', component: DefaultLayoutComponent,
              children: [
               
                  
              ]
          },
          // { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
          // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
          // { path: 'notfound', component: NotfoundComponent },
          // { path: '**', redirectTo: '/notfound' },
      ])
      // ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
