import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OutletContextData } from '@spartacus/storefront';
import { map, of } from 'rxjs';

/**
 * 【シナリオ3】画像バナーの上にキャンペーンの帯を重ねる(Outlet)。
 *
 * 継承もテンプレートのコピーも不要で、標準の BannerComponent には一切触れない。
 * outlet で「バナー型の直前(BEFORE)」に差し込み、CSS で次要素の上に重ねる。
 *
 * outlet の context から、自分が今どのバナーに差し込まれたか(uid)が取れるので、
 * 特定のバナーだけに出す、といった出し分けができる。
 */
@Component({
  selector: 'app-campaign-overlay',
  templateUrl: './campaign-overlay.component.html',
  styleUrl: './campaign-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignOverlayComponent {
  /** 対象にするバナーの uid(ここに載せたものだけ帯を出す) */
  private static readonly TARGET_UIDS = [
    'PowertoolsHompageSplashBannerComponent',
    'PowertoolsHompagePowerDrillsBannerComponent',
  ];

  private outlet = inject(OutletContextData, { optional: true });

  /** outlet の context。コンポーネント型 outlet では { component } が入る */
  private context = toSignal(
    this.outlet?.context$?.pipe(map((c: any) => c?.component)) ?? of(undefined)
  );

  /** 差し込み先バナーの uid */
  private uid = computed(() => this.context()?.uid as string | undefined);

  /** 対象バナーのときだけ表示する */
  visible = computed(() => {
    const uid = this.uid();
    return !!uid && CampaignOverlayComponent.TARGET_UIDS.includes(uid);
  });

  /** 実案件では CMS またはキャンペーン API から取得する想定の表示内容 */
  label = computed(() => '期間限定');
  message = computed(() => '全商品 10% OFF ／ 3営業日以内に出荷');
}
