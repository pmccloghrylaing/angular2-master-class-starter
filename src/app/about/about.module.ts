import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutRoutes } from './about.routes';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    RouterModule.forChild(AboutRoutes)
  ]
})
export class AboutModule {

}
