import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf, AsyncPipe, DecimalPipe } from '@angular/common';
import { StarRatingComponent } from '@spartacus/storefront';
import { TranslatePipe, FeatureDirective } from '@spartacus/core';
import { ProductIntroComponent } from '@spartacus/storefront';
// TODO: 次の imports は元ソースでは相対 import。public API に無ければ実装を確認すること:
//   StarRatingComponent(元: ../../../shared/components/star-rating/star-rating.component)
/**
 * ProductIntroComponent の継承オーバーライド(generate-override.js による生成)。
 * 元実装: spartacus/core-libs/storefront/cms-components/product/product-intro/product-intro.component.ts
 * ロジックは標準クラスを相続し、テンプレート(コピー)だけを編集する。
 */
@Component({
  selector: 'cx-product-intro',
  templateUrl: './product-intro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, StarRatingComponent, AsyncPipe, DecimalPipe, TranslatePipe, FeatureDirective],
})
export class CustomProductIntroComponent extends ProductIntroComponent {}
