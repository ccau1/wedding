interface Todo {
  _id: string;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PaginateResultState {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages?: number;
  offset?: number;
  refreshing?: boolean;
  fetching?: boolean;
  fetchedAt?: Date;
}

interface PaginateResult<T> extends PaginateResultState {
  docs: Array<T>;
}

interface ApiResponseDataError {
  statusCode: number;
  error: string;
  message: string;
}

interface UserToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresOn: number;
}

interface PaginateQueries {
  limit?: number;
  offset?: number;
  page?: number;
  paginate?: boolean;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  avatar?: string;
  gender: string;
  phone: string;
  website: string;
  roles: Array<{
    organization: string;
  }>;
}

interface LocalizeString {
  en?: string;
  "zh-hk"?: string;
  "zh-cn"?: string;
  [key: string]: string;
}

interface Address {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    text: string;
    country: string;
    state: string;
    city: string;
    district: string;
    estate: string;
    building: string;
    floor: number;
    unit: string;
    elevation_m: number;
  };
}

interface FileDocument {
  _id?: string;
  name: string;
  bucketType: string;
  bucketFilePath: string;
  bucketFileName: string;
  originalFileName: string;
  extension: string;
  size: number;
  url: string;
  thumbnailUrl: string;
  compressions: FileDocumentCompression[];
  organization?: string;
  isArchived?: boolean;
  mimeType: string;
  createdBy?: string;
}

//added "?" as create post not need
interface Post {
  slug?: string;
  title: { [key: string]: string };
  content: { [key: string]: string };
  categories?: [string];
  isArchived?: boolean;
  createdBy?: string;
}

interface PostSearch {}

interface ThreeDModel {
  title: string;
  type: "furniture" | "layout";
  category: string;
}

interface CreateModelRes {
  message: null;
  payload: { _id: string };
}

// interface Model {
//   _id: string;
//   title: string;
//   type: string;
//   files?: string[];
//   model?: {
//     title?: string;
//     fileName?: string;
//     path?: string;
//     styles?: Array<{
//       styleId: string;
//       materials: Array<any>;
//     }>;
//   };
//   objPath?: string;
//   categories: string[];
//   object?: Object3D;
// }

interface ViewStatQueries {
  me: boolean;
  types: string[];
  typeIds: string[];
  unique: boolean;
}

interface ViewStatPostData {
  type: string;
  typeId: string;
  scope: string;
  device?: string;
  user?: string;
  duration: number;
}

interface ApiError {
  __global?: string;
  statusCode?: number;
  [key: string]: string | number;
}
