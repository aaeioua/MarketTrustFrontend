/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @format int32 */
export enum PrecisionModels {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
}

/** @format int32 */
export enum Ordinates {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value7 = 7,
  Value8 = 8,
  Value16 = 16,
  Value32 = 32,
  Value64 = 64,
  Value128 = 128,
  Value256 = 256,
  Value512 = 512,
  Value1024 = 1024,
  Value2048 = 2048,
  Value4096 = 4096,
  Value8192 = 8192,
  Value16384 = 16384,
  Value32768 = 32768,
  Value65535 = 65535,
  Value65536 = 65536,
  Value65539 = 65539,
  Value65543 = 65543,
  Value131072 = 131072,
  Value262144 = 262144,
  Value524288 = 524288,
  Value1048576 = 1048576,
  Value2097152 = 2097152,
  Value4194304 = 4194304,
  Value8388608 = 8388608,
  Value16777216 = 16777216,
  Value33554432 = 33554432,
  Value67108864 = 67108864,
  Value134217728 = 134217728,
  Value268435456 = 268435456,
  Value536870912 = 536870912,
  Value1073741824 = 1073741824,
  Value2147483648 = -2147483648,
  Value655361 = -65536,
  Value12 = -1,
}

/** @format int32 */
export enum OgcGeometryType {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
  Value7 = 7,
  Value8 = 8,
  Value9 = 9,
  Value10 = 10,
  Value11 = 11,
  Value12 = 12,
  Value13 = 13,
  Value14 = 14,
  Value15 = 15,
  Value16 = 16,
}

/** @format int32 */
export enum Dimension {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value31 = -3,
  Value22 = -2,
  Value13 = -1,
}

/**
 * Represents the currency of a post's price.
 * @format int32
 */
export enum Currency {
  Value1 = 1,
}

/** Represents the data required to add a new N:MarketTrustAPI.Dtos.PropertyValue */
export interface AddPropertyValueDto {
  /**
   * The name for the new property
   * @minLength 1
   */
  name: string;
  /**
   * The value for the new property
   * @minLength 1
   */
  value: string;
}

/** DTO for N:MarketTrustAPI.Dtos.Category model. */
export interface CategoryDto {
  /**
   * The ID of the category.
   * @format int32
   */
  id?: number;
  /** The name of the category. */
  name?: string | null;
  /** The properties associated with the category. */
  properties?: PropertyDto[] | null;
  /** The properties inherited from the parent(s) of the category. */
  inheritedProperties?: PropertyDto[] | null;
  /**
   * The ID of the parent category.
   * @format int32
   */
  parentId?: number | null;
}

export interface Coordinate {
  /** @format double */
  x?: number;
  /** @format double */
  y?: number;
  /** @format double */
  z?: number;
  /** @format double */
  m?: number;
  coordinateValue?: Coordinate;
  isValid?: boolean;
}

export type CoordinateEqualityComparer = object;

export interface CoordinateSequence {
  /** @format int32 */
  dimension?: number;
  /** @format int32 */
  measures?: number;
  /** @format int32 */
  spatial?: number;
  ordinates?: Ordinates;
  hasZ?: boolean;
  hasM?: boolean;
  /** @format int32 */
  zOrdinateIndex?: number;
  /** @format int32 */
  mOrdinateIndex?: number;
  first?: Coordinate;
  last?: Coordinate;
  /** @format int32 */
  count?: number;
}

export interface CoordinateSequenceFactory {
  ordinates?: Ordinates;
}

/** Represents the data required to create a new post. */
export interface CreatePostDto {
  /**
   * The title of the post.
   * @minLength 1
   */
  title: string;
  /** The content of the post. */
  content?: string | null;
  /**
   * The category ID to which the post belongs.
   * @format int32
   */
  categoryId: number;
  /**
   * The price of the item in the post.
   * @format double
   */
  price?: number | null;
  /** Represents the currency of a post's price. */
  currency?: Currency;
}

/** Represents the data required to create a trust rating. */
export interface CreateTrustRatingDto {
  /**
   * The ID of the user who is giving the trust rating.
   * @minLength 1
   */
  trusteeId: string;
  /**
   * The ID of the user being rated.
   * @format double
   */
  trustValue: number;
  /**
   * The ID of the post associated with the trust rating.
   * @format int32
   */
  postId?: number | null;
  /** An optional comment about the trust rating. */
  comment?: string | null;
}

export interface Envelope {
  isNull?: boolean;
  /** @format double */
  width?: number;
  /** @format double */
  height?: number;
  /** @format double */
  diameter?: number;
  /** @format double */
  minX?: number;
  /** @format double */
  maxX?: number;
  /** @format double */
  minY?: number;
  /** @format double */
  maxY?: number;
  /** @format double */
  area?: number;
  /** @format double */
  minExtent?: number;
  /** @format double */
  maxExtent?: number;
  centre?: Coordinate;
}

export interface Geometry {
  factory?: GeometryFactory;
  userData?: any;
  /** @format int32 */
  srid?: number;
  geometryType?: string | null;
  ogcGeometryType?: OgcGeometryType;
  precisionModel?: PrecisionModel;
  coordinate?: Coordinate;
  coordinates?: Coordinate[] | null;
  /** @format int32 */
  numPoints?: number;
  /** @format int32 */
  numGeometries?: number;
  isSimple?: boolean;
  isValid?: boolean;
  isEmpty?: boolean;
  /** @format double */
  area?: number;
  /** @format double */
  length?: number;
  centroid?: Point;
  interiorPoint?: Point;
  pointOnSurface?: Point;
  dimension?: Dimension;
  boundary?: Geometry;
  boundaryDimension?: Dimension;
  envelope?: Geometry;
  envelopeInternal?: Envelope;
  isRectangle?: boolean;
}

export interface GeometryFactory {
  precisionModel?: PrecisionModel;
  coordinateSequenceFactory?: CoordinateSequenceFactory;
  /** @format int32 */
  srid?: number;
  geometryServices?: NtsGeometryServices;
}

export type GeometryOverlay = object;

/** Represents the data required for user login. */
export interface LoginDto {
  /**
   * The name of the user logging in.
   * @minLength 1
   */
  name: string;
  /**
   * The password of the user logging in.
   * @minLength 1
   */
  password: string;
}

/** Represents the data required to create a new user. */
export interface NewUserDto {
  /** The name of the new user. */
  name?: string | null;
  /** The email of the new user. */
  email?: string | null;
  /** The JWT token for the new user. */
  token?: string | null;
  id?: string | null;
}

export interface NtsGeometryServices {
  geometryOverlay?: GeometryOverlay;
  coordinateEqualityComparer?: CoordinateEqualityComparer;
  /** @format int32 */
  defaultSRID?: number;
  defaultCoordinateSequenceFactory?: CoordinateSequenceFactory;
  defaultPrecisionModel?: PrecisionModel;
}

export interface Point {
  factory?: GeometryFactory;
  userData?: any;
  /** @format int32 */
  srid?: number;
  precisionModel?: PrecisionModel;
  /** @format int32 */
  numGeometries?: number;
  isSimple?: boolean;
  isValid?: boolean;
  /** @format double */
  area?: number;
  /** @format double */
  length?: number;
  centroid?: Point;
  interiorPoint?: Point;
  pointOnSurface?: Point;
  envelope?: Geometry;
  envelopeInternal?: Envelope;
  isRectangle?: boolean;
  coordinateSequence?: CoordinateSequence;
  coordinates?: Coordinate[] | null;
  /** @format int32 */
  numPoints?: number;
  isEmpty?: boolean;
  dimension?: Dimension;
  boundaryDimension?: Dimension;
  /** @format double */
  x?: number;
  /** @format double */
  y?: number;
  coordinate?: Coordinate;
  geometryType?: string | null;
  ogcGeometryType?: OgcGeometryType;
  boundary?: Geometry;
  /** @format double */
  z?: number;
  /** @format double */
  m?: number;
}

/** DTO for N:MarketTrustAPI.Dtos.Post model. */
export interface PostDto {
  /**
   * The ID of the post.
   * @format int32
   */
  id?: number;
  /** The title of the post. */
  title?: string | null;
  /** The content of the post. */
  content?: string | null;
  /**
   * The global trust value of the author.
   * @format double
   */
  globalTrust?: number | null;
  /**
   * The personal trust value given by the user to the post author.
   * @format double
   */
  personalTrust?: number | null;
  /**
   * The creation time of the post.
   * @format date-time
   */
  createdAt?: string;
  /**
   * The last update time of the post.
   * @format date-time
   */
  lastUpdatedAt?: string | null;
  /** The ID of the user who created the post. */
  userId?: string | null;
  /**
   * The ID of the category to which the post belongs.
   * @format int32
   */
  categoryId?: number;
  /** The properties of the post. */
  propertyValues?: PropertyValueDto[] | null;
  /**
   * The price of the item in the post.
   * @format double
   */
  price?: number | null;
  /** Represents the currency of a post's price. */
  currency?: Currency;
}

export interface PrecisionModel {
  isFloating?: boolean;
  /** @format int32 */
  maximumSignificantDigits?: number;
  /** @format double */
  scale?: number;
  /** @format double */
  gridSize?: number;
  precisionModelType?: PrecisionModels;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

/** DTO for N:MarketTrustAPI.Dtos.Property model. */
export interface PropertyDto {
  /**
   * The ID of the property.
   * @format int32
   */
  id?: number;
  /** The name of the property. */
  name?: string | null;
  /** Indicates whether the property is mandatory. */
  isMandatory?: boolean;
  /**
   * The ID of the category to which this property belongs.
   * @format int32
   */
  categoryId?: number;
}

/** DTO for N:MarketTrustAPI.Dtos.PropertyValue model. */
export interface PropertyValueDto {
  /**
   * The ID of the property value.
   * @format int32
   */
  id?: number;
  /** The name of the property value. */
  name?: string | null;
  /** The value of the property. */
  value?: string | null;
  /**
   * The ID of the property to which this value belongs.
   * @format int32
   */
  postId?: number;
}

/** Represents the data required for user registration. */
export interface RegisterDto {
  /**
   * The username of the user.
   * @minLength 1
   */
  userName: string;
  /**
   * The email address of the user.
   * @format email
   * @minLength 1
   */
  email: string;
  /** Indicates whether the user's email should be publicly visible. */
  isPublicEmail?: boolean;
  /**
   * The phone number of the user.
   * @format tel
   */
  phone?: string | null;
  /** Indicates whether the user's phone number should be publicly visible. */
  isPublicPhone?: boolean;
  location?: Point;
  /** Indicates whether the user's location should be publicly visible. */
  isPublicLocation?: boolean;
  /**
   * The password for the user.
   * @format password
   * @minLength 1
   */
  password: string;
}

/** DTO for N:MarketTrustAPI.Dtos.TrustRating model. */
export interface TrustRatingDto {
  /**
   * The ID of the trust rating.
   * @format int32
   */
  id?: number;
  /** The ID of the user who is giving the trust rating. */
  trustorId?: string | null;
  /** The ID of the user being rated. */
  trusteeId?: string | null;
  /**
   * The trust value given by the trustor to the trustee.
   * @format double
   */
  trustValue?: number;
  /**
   * The time of creation of the trust rating.
   * @format date-time
   */
  createdAt?: string;
  /**
   * The ID of the post associated with this trust rating, if any.
   * @format int32
   */
  postId?: number | null;
  /** The post associated with this trust rating, if any. */
  comment?: string | null;
}

/** Represents the data required to update an existing post. */
export interface UpdatePostDto {
  /** The new title of the post. */
  title?: string | null;
  /** The new content of the post. */
  content?: string | null;
  /**
   * The new category ID to which the post belongs.
   * @format int32
   */
  categoryId?: number | null;
  /**
   * The new price of the item in the post.
   * @format double
   */
  price?: number | null;
  /** Represents the currency of a post's price. */
  currency?: Currency;
}

/** Represents the data required to update an existing property value. */
export interface UpdatePropertyValueDto {
  /** The new name of the property value. */
  name?: string | null;
  /** The new value of the property. */
  value?: string | null;
}

/** Represents the data required to update a trust rating. */
export interface UpdateTrustRatingDto {
  /**
   * The new trust value.
   * @format double
   */
  trustValue?: number | null;
  /** The new comment for the trust rating. */
  comment?: string | null;
}

/** Represents the data required to update a user. */
export interface UpdateUserDto {
  /** The new name of the user. */
  name?: string | null;
  /**
   * The new email of the user.
   * @format email
   */
  email?: string | null;
  /** The new email visibility status of the user. */
  isPublicEmail?: boolean | null;
  /**
   * The new phone number of the user.
   * @format tel
   */
  phone?: string | null;
  /** The new phone visibility status of the user. */
  isPublicPhone?: boolean | null;
  location?: Point;
  /** The new location visibility status of the user. */
  isPublicLocation?: boolean | null;
}

/** DTO for N:MarketTrustAPI.Dtos.User model. */
export interface UserDto {
  /** The ID of the user. */
  id?: string | null;
  /** The name of the user. */
  name?: string | null;
  /** The email of the user. */
  email?: string | null;
  /** The phone number of the user. */
  phone?: string | null;
  location?: Point;
  /** The posts created by the user. */
  posts?: PostDto[] | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Demo API
 * @version v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Account
     * @name AccountLoginCreate
     * @summary Logs in a user with the provided credentials.
     * @request POST:/api/Account/login
     * @secure
     */
    accountLoginCreate: (data: LoginDto, params: RequestParams = {}) =>
      this.request<NewUserDto, ProblemDetails>({
        path: `/api/Account/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountRegisterCreate
     * @summary Registers a new user with the provided information.
     * @request POST:/api/Account/register
     * @secure
     */
    accountRegisterCreate: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<NewUserDto, ProblemDetails>({
        path: `/api/Account/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name CategoryList
     * @summary Gets all categories based on the specified filters.
     * @request GET:/api/Category
     * @secure
     */
    categoryList: (
      query?: {
        /** The name of the category to search for. */
        Name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CategoryDto[], any>({
        path: `/api/Category`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name CategoryDetail
     * @summary Gets a category by its ID.
     * @request GET:/api/Category/{id}
     * @secure
     */
    categoryDetail: (id: number, params: RequestParams = {}) =>
      this.request<CategoryDto, ProblemDetails>({
        path: `/api/Category/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostList
     * @summary Gets all posts based on the specified filters.
     * @request GET:/api/Post
     * @secure
     */
    postList: (
      query?: {
        /** The title of the post to search for. */
        Title?: string;
        /** The contents (including properties) of the post to search for. */
        Content?: string;
        /**
         * The category ID to filter posts by.
         * @format int32
         */
        CategoryId?: number;
        /**
         * The longitude of the post's location for spatial search.
         * @format double
         * @min -180
         * @max 180
         */
        Longitude?: number;
        /**
         * The latitude of the post's location for spatial search.
         * @format double
         * @min -90
         * @max 90
         */
        Latitude?: number;
        /**
         * The search radius in meters for spatial search.
         * @format double
         */
        SearchRadius?: number;
        /**
         * See M:MarketTrustAPI.ReputationManager.IReputationManager.GetPersonalTrust(System.Int32,System.Double) for details.
         * @format double
         * @min 0
         * @max 1
         */
        D?: number;
        /**
         * Page number for pagination.
         * @format int32
         * @min 1
         * @max 2147483647
         */
        Page?: number;
        /**
         * Number of posts per page for pagination.
         * @format int32
         * @min 1
         * @max 2147483647
         */
        PageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostDto[], any>({
        path: `/api/Post`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostCreate
     * @summary Creates a new post.
     * @request POST:/api/Post
     * @secure
     */
    postCreate: (data: CreatePostDto, params: RequestParams = {}) =>
      this.request<PostDto, ProblemDetails>({
        path: `/api/Post`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostDetail
     * @summary Gets a post by its ID.
     * @request GET:/api/Post/{id}
     * @secure
     */
    postDetail: (
      id: number,
      query?: {
        /**
         * See M:MarketTrustAPI.ReputationManager.IReputationManager.GetPersonalTrust(System.Int32,System.Double) for details.
         * @format double
         * @min 0
         * @max 1
         */
        D?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostDto, ProblemDetails>({
        path: `/api/Post/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostUpdate
     * @summary Updates a post with the specified ID.
     * @request PUT:/api/Post/{id}
     * @secure
     */
    postUpdate: (id: number, data: UpdatePostDto, params: RequestParams = {}) =>
      this.request<PostDto, ProblemDetails>({
        path: `/api/Post/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostDelete
     * @summary Deletes a post with the specified ID.
     * @request DELETE:/api/Post/{id}
     * @secure
     */
    postDelete: (id: number, params: RequestParams = {}) =>
      this.request<PostDto, ProblemDetails>({
        path: `/api/Post/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostCreate2
     * @summary Adds a property value to a post.
     * @request POST:/api/Post/{id}
     * @originalName postCreate
     * @duplicate
     * @secure
     */
    postCreate2: (
      id: number,
      data: AddPropertyValueDto,
      params: RequestParams = {},
    ) =>
      this.request<PostDto, ProblemDetails>({
        path: `/api/Post/${id}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostUpdate2
     * @summary Updates a property value of a post.
     * @request PUT:/api/Post/{postId}/{propertyValueId}
     * @originalName postUpdate
     * @duplicate
     * @secure
     */
    postUpdate2: (
      postId: number,
      propertyValueId: number,
      data: UpdatePropertyValueDto,
      params: RequestParams = {},
    ) =>
      this.request<PostDto, ProblemDetails>({
        path: `/api/Post/${postId}/${propertyValueId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostDelete2
     * @summary Deletes a property value from a post.
     * @request DELETE:/api/Post/{postId}/{propertyValueId}
     * @originalName postDelete
     * @duplicate
     * @secure
     */
    postDelete2: (
      postId: number,
      propertyValueId: number,
      params: RequestParams = {},
    ) =>
      this.request<PostDto, ProblemDetails>({
        path: `/api/Post/${postId}/${propertyValueId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reputation
     * @name ReputationGlobalDetail
     * @summary Gets the global trust for a user.
     * @request GET:/api/Reputation/global/{userId}
     * @secure
     */
    reputationGlobalDetail: (userId: string, params: RequestParams = {}) =>
      this.request<number, ProblemDetails>({
        path: `/api/Reputation/global/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reputation
     * @name ReputationPersonalList
     * @summary Gets the personal trust that the requesting user has for another user.
     * @request GET:/api/Reputation/personal
     * @secure
     */
    reputationPersonalList: (
      query: {
        /** The ID of the user whose personal trust vector is being requested. */
        TrusteeId: string;
        /**
         * See M:MarketTrustAPI.ReputationManager.IReputationManager.GetPersonalTrust(System.Int32,System.Double) for details.
         * @format double
         * @min 0
         * @max 1
         */
        D: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<number, ProblemDetails>({
        path: `/api/Reputation/personal`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrustRating
     * @name TrustRatingList
     * @summary Gets all trust ratings based on the specified filters.
     * @request GET:/api/TrustRating
     * @secure
     */
    trustRatingList: (
      query?: {
        /** The ID of the user who is giving the trust rating. */
        TrusteeId?: string;
        /**
         * The post ID associated with the trust rating.
         * @format int32
         */
        PostId?: number;
        /**
         * The page number for pagination.
         * @format int32
         * @min 1
         * @max 2147483647
         */
        Page?: number;
        /**
         * The number of items per page for pagination.
         * @format int32
         * @min 1
         * @max 2147483647
         */
        PageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<TrustRatingDto[], ProblemDetails>({
        path: `/api/TrustRating`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrustRating
     * @name TrustRatingCreate
     * @summary Creates a new trust rating.
     * @request POST:/api/TrustRating
     * @secure
     */
    trustRatingCreate: (
      data: CreateTrustRatingDto,
      params: RequestParams = {},
    ) =>
      this.request<TrustRatingDto, ProblemDetails>({
        path: `/api/TrustRating`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrustRating
     * @name TrustRatingDetail
     * @summary Gets a trust rating by its ID.
     * @request GET:/api/TrustRating/{id}
     * @secure
     */
    trustRatingDetail: (id: number, params: RequestParams = {}) =>
      this.request<TrustRatingDto, ProblemDetails>({
        path: `/api/TrustRating/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrustRating
     * @name TrustRatingUpdate
     * @summary Updates a trust rating with the specified ID.
     * @request PUT:/api/TrustRating/{id}
     * @secure
     */
    trustRatingUpdate: (
      id: number,
      data: UpdateTrustRatingDto,
      params: RequestParams = {},
    ) =>
      this.request<TrustRatingDto, ProblemDetails>({
        path: `/api/TrustRating/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrustRating
     * @name TrustRatingDelete
     * @summary Deletes a trust rating with the specified ID.
     * @request DELETE:/api/TrustRating/{id}
     * @secure
     */
    trustRatingDelete: (id: number, params: RequestParams = {}) =>
      this.request<TrustRatingDto, ProblemDetails>({
        path: `/api/TrustRating/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserList
     * @summary Gets all users based on the filteres.
     * @request GET:/api/User
     * @secure
     */
    userList: (
      query?: {
        /** The name of the users to search for. */
        Name?: string;
        /** The email of the users to search for. */
        Email?: string;
        /** The phone number of the users to search for. */
        Phone?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserDto[], any>({
        path: `/api/User`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserUpdate
     * @summary Updates a user with the specified ID.
     * @request PUT:/api/User
     * @secure
     */
    userUpdate: (data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<UserDto, ProblemDetails>({
        path: `/api/User`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserDelete
     * @summary Deletes a user with the specified ID.
     * @request DELETE:/api/User
     * @secure
     */
    userDelete: (params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/User`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserDetail
     * @summary Gets a user by their ID.
     * @request GET:/api/User/{id}
     * @secure
     */
    userDetail: (id: string, params: RequestParams = {}) =>
      this.request<UserDto, ProblemDetails>({
        path: `/api/User/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
