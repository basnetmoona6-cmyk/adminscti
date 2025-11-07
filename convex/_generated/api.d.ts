/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as addUser from "../addUser.js";
import type * as auth from "../auth.js";
import type * as getStudents from "../getStudents.js";
import type * as login from "../login.js";
import type * as news from "../news.js";
import type * as registrationStatus from "../registrationStatus.js";
import type * as students from "../students.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  addUser: typeof addUser;
  auth: typeof auth;
  getStudents: typeof getStudents;
  login: typeof login;
  news: typeof news;
  registrationStatus: typeof registrationStatus;
  students: typeof students;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
