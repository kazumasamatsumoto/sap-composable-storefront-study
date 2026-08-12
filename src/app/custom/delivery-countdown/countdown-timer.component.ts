import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

/**
 * 【手法⑥】presentational(表示専用)コンポーネント。
 * - 入力は input.required() / input()。Spartacus にも CMS にも依存しない
 * - ユーザー操作は output() で「意図」だけを通知し、何をするかは smart 側が決める
 * - 派生値は computed() で宣言。remainingMs が変わると自動で再計算・再描画される
 * 単体テストは入力を与えて出力を見るだけで書ける(CmsComponentData のモック不要)。
 */
@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
})
export class CountdownTimerComponent {
  /** 残り時間(ms)。親が時計を持ち、この部品は受け取った値を表示するだけ */
  remainingMs = input.required<number>();
  expiredMessage = input('');
  ctaLabel = input('');

  /** 「ボタンが押された」という意図のみを親へ。遷移先の判断は親の責務 */
  ctaClick = output<void>();

  expired = computed(() => this.remainingMs() <= 0);

  private totalSec = computed(() =>
    Math.max(0, Math.floor(this.remainingMs() / 1000))
  );
  hours = computed(() => Math.floor(this.totalSec() / 3600));
  minutes = computed(() => Math.floor((this.totalSec() % 3600) / 60));
  seconds = computed(() => this.totalSec() % 60);
}
