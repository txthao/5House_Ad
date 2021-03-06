import { environment } from '../../../environments/environment';

export class ApiConstants {

  public static readonly URL = environment.apiUrl;
  public static readonly HEADER_AUTH = environment.apiHeaderAuth;
  public static readonly HEADER_CONTENT_TYPE = environment.apiHeaderContentType;
  public static readonly HEADER_JSON = environment.apiHeaderJson;

  public static readonly ADMIN_API = '/api/admin';

  public static readonly PROVINCE_API = ApiConstants.ADMIN_API + '/province';
  public static readonly DISTRICT_API = ApiConstants.ADMIN_API + '/districts';
  public static readonly WARD_API = ApiConstants.ADMIN_API + '/wards';
  public static readonly STREET_API = ApiConstants.ADMIN_API + '/streets';
  public static readonly CATEGORY_API = ApiConstants.ADMIN_API + '/categories';
  public static readonly CUSTOMER_API = ApiConstants.ADMIN_API + '/customers';
  public static readonly POST_API = ApiConstants.ADMIN_API + '/post';
}
