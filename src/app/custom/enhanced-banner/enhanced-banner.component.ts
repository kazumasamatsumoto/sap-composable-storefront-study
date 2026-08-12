import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BannerComponent,
  GenericLinkComponent,
  MediaComponent,
} from '@spartacus/storefront';

/**
 * 【Case B】標準にあるが Accelerator でカスタマイズしていたコンポーネントの移行例。
 * - 標準 BannerComponent を継承 → リンク解決・画像選択などのロジックは丸ごと相続。
 *   将来の Spartacus アップグレードの改善も自動で受け取れる
 * - テンプレートだけ差し替えて「移行カスタマイズ」バッジを追加
 * - selector を標準と同じ 'cx-banner' に保つことで @spartacus/styles の既存CSSも効かせる
 * - CMS型名との再紐付けは enhanced-banner.module.ts(設定は後勝ちで標準を上書き)
 */
@Component({
  selector: 'cx-banner',
  templateUrl: './enhanced-banner.component.html',
  styleUrl: './enhanced-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, GenericLinkComponent, MediaComponent],
})
export class EnhancedBannerComponent extends BannerComponent {}
