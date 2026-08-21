import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CmsStoreNoticeComponent } from './store-notice.model';

/**
 * 【シナリオ1】JSP で作られていた独自部品を CMSFlexComponent として移植した例。
 *
 * ポイント:
 * - CMS の型は CMSFlexComponent、マッピングのキーは flexType の値
 *   (JspIncludeComponent の uid 方式と違い、同じ部品を複数配置できる)
 * - JSP の `${component.xxx}` は CmsComponentData 経由のバインドに置き換える
 * - 値が無い場合に備えて既定文言を持つ(移植初期は CMS 側が未整備なため)
 */
@Component({
  selector: 'app-store-notice',
  templateUrl: './store-notice.component.html',
  styleUrl: './store-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreNoticeComponent {
  /** Outlet 経由で差し込まれた場合は CmsComponentData が無いので optional */
  private componentData = inject<CmsComponentData<CmsStoreNoticeComponent>>(
    CmsComponentData,
    { optional: true }
  );

  private data = toSignal(this.componentData?.data$ ?? of(undefined));

  headline = computed(() => this.data()?.headline ?? 'お知らせ');
  body = computed(
    () =>
      this.data()?.body ??
      '年末年始(12/29〜1/3)は出荷業務を休止します。ご注文は通常どおり承ります。'
  );
  tone = computed(() => this.data()?.tone ?? 'info');
  linkUrl = computed(() => this.data()?.linkUrl);
  linkLabel = computed(() => this.data()?.linkLabel ?? '詳細を見る');
}
