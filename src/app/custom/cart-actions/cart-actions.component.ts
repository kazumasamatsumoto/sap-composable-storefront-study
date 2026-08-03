import { Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';

/**
 * カートページに差し込む学習用ボタン(TS / HTML / SCSS の3ファイル分離)。
 * - 配置: EmptyCartMiddleContent スロットの直後に outlet 機構で差し込む
 *   (→ cart-actions.module.ts の provideOutlet)
 * - 遷移: Router 直接ではなく RoutingService に「意味名(cxRoute)」で依頼する。
 *   URL 構造が RoutingConfig で変わっても壊れない
 */
@Component({
  selector: 'app-cart-actions',
  standalone: false,
  templateUrl: './cart-actions.component.html',
  styleUrl: './cart-actions.component.scss',
})
export class CartActionsComponent {
  constructor(private routingService: RoutingService) {}

  continueShopping(): void {
    this.routingService.go({ cxRoute: 'home' });
  }
}
