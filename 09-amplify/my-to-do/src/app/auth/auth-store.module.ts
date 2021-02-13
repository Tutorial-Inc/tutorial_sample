import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import fromAuth, { name as authFeatureKey } from './auth.slice';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(authFeatureKey, fromAuth),
  ]
})
export class AuthStoreModule { }
