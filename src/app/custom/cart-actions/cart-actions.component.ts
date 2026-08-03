import { Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';

/**
 * カートページに差し込む学習用ボタン。
 * - 配置: EmptyCartMiddleContent スロット(空カート時の中央領域)の直後に
 *   outlet 機構で差し込む(→ cart-actions.module.ts の provideOutlet)
 * - 遷移: Router を直接使わず、Spartacus の RoutingService に
 *   「意味名(cxRoute)」で依頼する。URL 構造が RoutingConfig で変わっても壊れない
 */
@Component({
  selector: 'app-cart-actions',
  standalone: false,
  template: `
    <div class="app-cart-actions">
      <button class="btn btn-primary" (click)="continueShopping()">
        お買い物を続ける
      </button>
    </div>
  `,
})
export class CartActionsComponent {
  constructor(private routingService: RoutingService) {}

  continueShopping(): void {
    this.routingService.go({ cxRoute: 'home' });
  }
}
