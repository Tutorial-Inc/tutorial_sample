import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoModalPage } from './todo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TodoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoModalPageRoutingModule {}
