import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthFacade } from '../auth/auth.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(
    private authService: AuthFacade,
    private alertController: AlertController,
  ) { }

  email$ = this.authService.currentAuthenticatedSession$.pipe(
    map(user => user?.email)
  )

  async onLogoutClicked() {
    const alert = await this.alertController.create({
      header: "ログアウトしますか？",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'ログアウト',
          handler: () => {
            console.log('logging out...');
            this.authService.logout();
          }
        }
      ]
    })

    await alert.present();
  }

}
