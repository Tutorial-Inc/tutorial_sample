import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import fromTodo, { name as todoFeatureKey } from './todo.slice';
// import * as fromTodo from './todo.reducer';

import { IonicModule } from '@ionic/angular';

import { TodoPageRoutingModule } from './todo-routing.module';

import { TodoPage } from './todo.page';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoPageRoutingModule,
    StoreModule.forFeature(todoFeatureKey, fromTodo)
  ],
  declarations: [TodoPage]
})
export class TodoPageModule {}
