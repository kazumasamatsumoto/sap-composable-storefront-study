import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { DeliveryCountdownComponent } from './delivery-countdown.component';

/**
 * 【手法⑥】CMS 型名との紐付け。登録方法は ③ と同一で、
 * コンポーネント内部が signal ベースかどうかは CmsConfig に影響しない。
 * (= 既存の Observable 版と signal 版は共存でき、段階的に移行できる)
 */
@NgModule({
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        EmintDeliveryCountdownComponent: {
          component: DeliveryCountdownComponent,
        },
      },
    }),
  ],
})
export class DeliveryCountdownModule {}
