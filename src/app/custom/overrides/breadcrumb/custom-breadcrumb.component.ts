import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@spartacus/core';
import { BreadcrumbComponent } from '@spartacus/storefront';

/**
 * 【個別オーバーライド例(eager 領域)】BreadcrumbComponent の継承差し替え。
 * - ロジック(crumbs$ の組み立て・ページタイトル)は標準クラスを丸ごと相続
 * - テンプレートは標準の breadcrumb.component.html をベースに、
 *   先頭に 🏠 を追加し区切りをカスタムする軽い変更のみ
 * - selector は標準と同じ 'cx-breadcrumb' を維持し、@spartacus/styles の既存CSSを効かせる
 * - 登録は custom-breadcrumb.module.ts(CmsConfig の後勝ち上書き)
 */
@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './custom-breadcrumb.component.html',
  styleUrl: './custom-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, RouterLink, AsyncPipe, TranslatePipe],
})
export class CustomBreadcrumbComponent extends BreadcrumbComponent {}
