import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationConfigService {
  private endpointPrefix = '';
  private microfrontend = false;

  setEndpointPrefix(endpointPrefix: string): void {
    this.endpointPrefix = endpointPrefix;
  }

  setMicrofrontend(microfrontend = true): void {
    this.microfrontend = microfrontend;
  }

  isMicrofrontend(): boolean {
    return this.microfrontend;
  }

  getEndpointFor(api: string, microservice?: string): string {
    if (microservice) {
      console.warn('in ms')
      console.warn(`${this.endpointPrefix}services/${microservice}/${api}`)
      return `${this.endpointPrefix}services/${microservice}/${api}`;
    }
    console.warn('not ms')
    console.warn(`${this.endpointPrefix}${api}`)
    return `${this.endpointPrefix}${api}`;
  }
}
