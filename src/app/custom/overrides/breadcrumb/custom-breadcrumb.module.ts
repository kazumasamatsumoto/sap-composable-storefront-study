import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { CustomBreadcrumbComponent } from './custom-breadcrumb.component';

/**
 * eager 領域(BreadcrumbModule は SpartacusFeaturesModule で常時ロード)の差し替えは、
 * AppModule で SpartacusModule より後に import するだけでよい(設定の後勝ち)。
 */
@NgModule({
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        BreadcrumbComponent: { component: CustomBreadcrumbComponent },
      },
    }),
  ],
})
export class CustomBreadcrumbModule {}
