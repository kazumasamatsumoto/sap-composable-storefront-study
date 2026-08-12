import { isDevMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { environment } from './environments/environment';

/**
 * MSW(モックワーカー)をアプリ起動前に立ち上げる。
 * - dev ビルドかつ environment.mockCms が true のときだけ有効
 * - 未定義リクエストは素通し(onUnhandledRequest: 'bypass')なので、
 *   CMSページ以外は今まで通り実バックエンドへ届く
 */
async function prepare(): Promise<void> {
  if (environment.mockCms && isDevMode()) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: { url: '/mockServiceWorker.js' },
    });
  }
}

prepare()
  .then(() => platformBrowser().bootstrapModule(AppModule, {}))
  .catch((err) => console.error(err));
