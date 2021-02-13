import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { TodoPageModule } from './todo/todo.module';
import { AuthStoreModule } from './auth/auth-store.module';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarPageModule } from './calendar/calendar.module';
import { TodoModalPageModule } from './todo/todo-modal/todo-modal.module';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo/todo.effects';
import { AuthEffects } from './auth/auth.effects';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AmplifyUIAngularModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([TodoEffects, AuthEffects]),
    AuthStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    TodoPageModule,
    CalendarPageModule,
    TodoModalPageModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
