import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MiniCartComponent } from '@spartacus/cart/base/components/mini-cart';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import { IconComponent } from '@spartacus/storefront';

/**
 * 【個別オーバーライド例(lazy 領域)】MiniCartComponent の継承差し替え。
 * - quantity$ / total$ の取得ロジック(MiniCartComponentService)は標準クラスを相続
 * - テンプレートは標準の mini-cart.component.html ベースに、
 *   数量が入ったときのバッジ表示を追加する軽い変更のみ
 * - lazy ロードを壊さないため、登録は custom-mini-cart.module.ts(ラッパーモジュール)で行い、
 *   features/cart-base-feature.module.ts の MINI_CART_FEATURE から dynamic import する
 *   (=このファイルも lazy チャンク側に入る)
 */
@Component({
  selector: 'cx-mini-cart',
  templateUrl: './custom-mini-cart.component.html',
  styleUrl: './custom-mini-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, IconComponent, AsyncPipe, UrlPipe, TranslatePipe],
})
export class CustomMiniCartComponent extends MiniCartComponent {}
