import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CmsCampaignNoticeComponent } from './campaign-notice.model';

/**
 * 【Case A】Composable Storefront に存在しない Accelerator 独自コンポーネントの再実装例。
 * - データは CmsComponentData 経由(CMSレスポンスの fields がそのまま流れてくる)
 * - CMS型名との紐付けは campaign-notice.module.ts の provideConfig(CmsConfig)
 * - 表示ロジックのみを持ち、ビジネスロジックは OCC 側の責務(CLAUDE.md の規約)
 */
@Component({
  selector: 'app-campaign-notice',
  templateUrl: './campaign-notice.component.html',
  styleUrl: './campaign-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe],
})
export class CampaignNoticeComponent {
  protected component: CmsComponentData<CmsCampaignNoticeComponent> =
    inject(CmsComponentData);

  data$: Observable<CmsCampaignNoticeComponent> = this.component.data$;
}
