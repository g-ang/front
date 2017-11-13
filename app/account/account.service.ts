import { CommonService, Injectable, Observable } from '../common.service';
@Injectable()
export class AccountService extends CommonService{
    login(account_name: string, password: string): Observable<Object> {
        return this.post('/common/api/login', { user: account_name, password: password });
    }
}
