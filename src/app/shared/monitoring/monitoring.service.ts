import { Injectable } from '@angular/core';
import { datadogRum } from '@datadog/browser-rum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor() {}

  public initializeDatadog(): void {
    datadogRum.init({
      applicationId: environment.datadogAplicationId,
      clientToken: environment.datadogClientToken,
      site: 'datadoghq.com',
      service: 'avrae.io',
      env: environment.production ? 'prod' : 'test',
      version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
    });
  }
}
