import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacade } from './auth/auth.facade';
import { LoadingController } from '@ionic/angular';
import { UiService } from './ui/ui.service';
import { takeUntil, map, concatMap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthFacade,
    private loadingController: LoadingController,
    private uiService: UiService,
  ) {}

  destroy$ = new Subject();

  loading$ = this.uiService.loading$;

  loading: HTMLIonLoadingElement;

  ngOnInit() {
    this.authService.initAuthState();
    this.loading$.pipe(
      takeUntil(this.destroy$),
      concatMap(loading => {
        console.log(loading);
        if (loading) {
          return this.presentLoading();
         } else {
          return this.dismissLoading();
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: '読み込み中',
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (!this.loading) return;
    this.loading.dismiss();
    this.loading = null;
  }
}
