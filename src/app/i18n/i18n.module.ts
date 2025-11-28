import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ]
})
export class I18nModule {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    let browserLang = translate.getBrowserLang();
    if(browserLang === undefined || browserLang === null){
      browserLang = 'es' ;
    }
    translate.use(browserLang);
  }
}

export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
