import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Observable, map } from 'rxjs';

/**
 * 学習用の最初のカスタムコンポーネント。
 * mystore の app 層に「DI・ライフサイクル・RxJS」が登場するのはここから。
 * - DI: constructor で facade(ActiveCartFacade)を注入
 * - RxJS: facade が返す Observable を async パイプで表示
 * - ライフサイクル: ngOnInit / ngOnDestroy は通常の Angular どおり動く
 */
@Component({
  selector: 'app-demo-bar',
  standalone: false,
  template: `
    <div class="app-demo-bar">
      学習用カスタムコンポーネント(outlet 差し込み)— カート内点数:
      <strong>{{ totalItems$ | async }}</strong>
    </div>
  `,
})
export class DemoBarComponent implements OnInit, OnDestroy {
  totalItems$: Observable<number>;

  constructor(private activeCartFacade: ActiveCartFacade) {
    this.totalItems$ = this.activeCartFacade
      .getActive()
      .pipe(map((cart) => cart.totalItems ?? 0));
  }

  ngOnInit(): void {
    console.log('[DemoBar] ngOnInit — ライフサイクルは通常どおり呼ばれる');
  }

  ngOnDestroy(): void {
    console.log('[DemoBar] ngOnDestroy');
  }
}
