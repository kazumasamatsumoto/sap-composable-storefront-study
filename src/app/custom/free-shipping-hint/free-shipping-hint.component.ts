import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

/**
 * 【手法⑦】outlet 差し込み × Spartacus Facade の signal 消費。
 * ①(cart-actions)の signal 版にあたる対比サンプル。
 *
 * - Spartacus の Facade(ActiveCartFacade)は Observable を返す。
 *   toSignal() で境界を signal に変換すれば、以降の派生値は computed() だけで書ける
 *   (combineLatest / map のオペレータチェーンが不要になる)
 * - Facade はカートの取得・キャッシュ・NgRx を全て隠蔽している。
 *   このコンポーネントは「読むだけ」で、状態管理コードを一切持たない
 */
@Component({
  selector: 'app-free-shipping-hint',
  templateUrl: './free-shipping-hint.component.html',
  styleUrl: './free-shipping-hint.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
})
export class FreeShippingHintComponent {
  /** 送料無料ライン(デモ用の固定値。実案件では OCC 側から返す想定) */
  protected readonly threshold = 200;

  private activeCart = inject(ActiveCartFacade);

  private cart = toSignal(this.activeCart.getActive());

  total = computed(() => this.cart()?.totalPrice?.value ?? 0);
  currency = computed(() => this.cart()?.totalPrice?.currencyIso ?? 'USD');
  remaining = computed(() => Math.max(0, this.threshold - this.total()));
  reached = computed(() => this.remaining() === 0 && this.total() > 0);
  /** プログレスバー幅(%)。0件カートでは 0 */
  progress = computed(() =>
    Math.min(100, Math.round((this.total() / this.threshold) * 100))
  );
}
