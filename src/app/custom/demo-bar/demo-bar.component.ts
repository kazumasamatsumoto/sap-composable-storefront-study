import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Observable, map } from 'rxjs';

/**
 * 学習用の最初のカスタムコンポーネント。
 * TS / HTML / SCSS の3ファイル分離 — 自作コンポーネントは通常の Angular 開発と同じ形。
 * - DI: constructor で facade(ActiveCartFacade)を注入
 * - RxJS: facade が返す Observable を async パイプで表示
 * - ライフサイクル: ngOnInit / ngOnDestroy は通常どおり動く
 */
@Component({
  selector: 'app-demo-bar',
  standalone: false,
  templateUrl: './demo-bar.component.html',
  styleUrl: './demo-bar.component.scss',
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
