import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Registration } from 'app/account/register/register.model';
import { User } from 'app/admin/user-management/user-management.model';

@Injectable({ providedIn: 'root' })
export class MailService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  sendMail(user: User): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/book-apt'), user);
  }
}
