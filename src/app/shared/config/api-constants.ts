import { environment } from '../../../environments/environment';

export class ApiConstants {
    public static readonly URL = environment.apiUrl;
    public static readonly HEADER_AUTH = environment.apiHeaderAuth;
    public static readonly HEADER_ACCEPT = environment.apiHeaderAccept;
    public static readonly HEADER_JSON = environment.apiHeaderJson;

    public static readonly ADMIN_API = '/api/admin';

    public static readonly PROVINCE_API = ApiConstants.ADMIN_API + '/province';
}
