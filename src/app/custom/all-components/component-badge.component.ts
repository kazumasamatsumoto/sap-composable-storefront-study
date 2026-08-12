import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OutletContextData } from '@spartacus/storefront';

/**
 * 全CMSコンポーネントの直前に差し込まれる「型名バッジ」。
 * outlet 経由で描画されるため、OutletContextData から自分がどの outlet
 * (= CMSコンポーネント型名)に居るかを取得できる。
 * 画面上の全コンポーネントに型名ラベルが付き、Gap 分析時に
 * 「この部品はどの CMS 型か」を実機で確認できる。
 */
@Component({
  selector: 'app-component-badge',
  template: `<span class="cms-type-badge" *ngIf="type">{{ type }}</span>`,
  styleUrl: './component-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
})
export class ComponentBadgeComponent {
  protected outlet = inject(OutletContextData, { optional: true });

  /** outlet の reference = provideOutlet した id = CMSコンポーネント型名 */
  type = this.outlet?.reference;
}
