import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataParserComponent } from './components/data-parser/data-parser.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/data-parser',
    pathMatch: 'full'
  },
  {
  path: 'data-parser',
  component:DataParserComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
