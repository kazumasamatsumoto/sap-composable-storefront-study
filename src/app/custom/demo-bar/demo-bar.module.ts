import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { DemoBarComponent } from './demo-bar.component';

@NgModule({
  declarations: [DemoBarComponent],
  imports: [CommonModule],
  providers: [
    // ヘッダーの手前に差し込む。「どこに出すか」も Router ではなく outlet 機構で決まる
    provideOutlet({
      id: 'cx-header',
      position: OutletPosition.BEFORE,
      component: DemoBarComponent,
    }),
  ],
})
export class DemoBarModule {}
