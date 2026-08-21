import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BannerComponent,
  GenericLinkComponent,
  MediaComponent,
} from '@spartacus/storefront';

/**
 * 【シナリオ2】既存コンポーネントをカスタマイズしてモダンなデザインにする。
 *
 * 標準の BannerComponent を **継承** し、テンプレートと SCSS だけを差し替える:
 * - リンク解決(routerLink)・画像選択(getImage)・alt テキストなどのロジックは
 *   標準クラスから相続するので、将来のアップグレードで改善されればそれも受け取れる
 * - selector は標準と同じ 'cx-banner' を維持 → @spartacus/styles の既存CSSが効く
 * - 見た目だけを今風に: 角丸・オーバーレイグラデーション・ホバーでのズーム、
 *   テキストを画像の上に重ねる構成
 *
 * 登録は CmsConfig で同じ型名(SimpleResponsiveBannerComponent / BannerComponent)に
 * 再登録する。設定は deep-merge の後勝ちなので、SpartacusModule より後に読み込めば勝つ。
 */
@Component({
  selector: 'cx-banner',
  templateUrl: './modern-banner.component.html',
  styleUrl: './modern-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, GenericLinkComponent, MediaComponent],
})
export class ModernBannerComponent extends BannerComponent {}
