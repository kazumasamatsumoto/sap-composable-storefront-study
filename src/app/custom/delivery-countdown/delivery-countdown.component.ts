import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoutingService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CountdownTimerComponent } from './countdown-timer.component';
import { CmsDeliveryCountdownComponent } from './delivery-countdown.model';

/**
 * 【手法⑥】signal 版 新規CMSコンポーネント(smart 側)。
 * ③(campaign-notice)の Observable + AsyncPipe 構成を Angular 21 の
 * signal ベース API で書いた対比サンプル。
 *
 * - CMSデータ: CmsComponentData.data$(Observable)を toSignal() で signal 化
 * - 時計: signal + afterNextRender(ブラウザ初回描画後にのみ実行 = SSR 安全。
 *   isPlatformBrowser の分岐を自分で書かなくてよい)
 * - 派生値: computed() のチェーン。remainingMs は now と CMS データ両方に反応する
 * - 子(presentational)へは input で渡し、output で意図を受ける。
 *   「画面側の責務」の中をさらに 取得/判断(smart) と 表示(presentational) に分離
 */
@Component({
  selector: 'app-delivery-countdown',
  templateUrl: './delivery-countdown.component.html',
  styleUrl: './delivery-countdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownTimerComponent],
})
export class DeliveryCountdownComponent {
  private component: CmsComponentData<CmsDeliveryCountdownComponent> =
    inject(CmsComponentData);
  private routing = inject(RoutingService);
  private destroyRef = inject(DestroyRef);

  /** CMS データ。ストリーム到着前は undefined なのでテンプレートは @if でガード */
  data = toSignal(this.component.data$);

  /** 現在時刻(1秒刻み)。SSR では初期値のまま = サーバーで setInterval は走らない */
  private now = signal(Date.now());

  /** 当日 deadlineHour 時の epoch ms。CMS fields は文字列なので Number() で変換 */
  private deadline = computed(() => {
    const hour = Number(this.data()?.deadlineHour ?? 15);
    const d = new Date(this.now());
    d.setHours(hour, 0, 0, 0);
    return d.getTime();
  });

  remainingMs = computed(() => this.deadline() - this.now());

  constructor() {
    afterNextRender(() => {
      const id = setInterval(() => this.now.set(Date.now()), 1_000);
      this.destroyRef.onDestroy(() => clearInterval(id));
    });
  }

  /** 遷移の判断は smart 側の責務。URL 直書きせず cxRoute で解決する */
  onCtaClick(): void {
    this.routing.go({ cxRoute: 'cart' });
  }
}
