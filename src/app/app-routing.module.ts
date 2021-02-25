import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'vis',
    loadChildren: () => import('./vis/vis.module').then(m => m.VisModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/vis'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
