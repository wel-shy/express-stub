import { Handler, Response, Router } from "express";
import { HttpError } from "http-errors";
import { HttpMethods } from "../HttpMethods";

/**
 * @apiDefine isAuthenticated
 * @apiHeader {String} x-access-token Users authentication token
 */

/**
 * Base router class. All routers extend this class.
 */
export abstract class BaseRouter {
  public static errorCheck(res: Response): HttpError {
    if (res.locals.error) {
      return res.locals.error as HttpError;
    }
    return null;
  }
  public router: Router;
  public fileUploadHandler: Handler;

  protected constructor() {
    this.router = Router();
  }

  /**
   * Add a route to the router.
   * @param {string} path
   * @param {Methods} method
   * @param handler
   */
  public addRoute(path: string, method: HttpMethods, handler: Handler) {
    switch (method) {
      case HttpMethods.GET:
        this.router.get(path, handler);
        break;
      case HttpMethods.POST:
        this.router.post(path, handler);
        break;
      case HttpMethods.PUT:
        this.router.put(path, handler);
        break;
      case HttpMethods.DELETE:
        this.router.delete(path, handler);
    }
  }

  /**
   * Return the router.
   * @returns {e.Router}
   */
  public getRouter(): Router {
    return this.router;
  }

  public setFileUploadHandler(handler: Handler): void {
    this.fileUploadHandler = handler;
  }

  /**
   * Add middleware to the router.
   * @param middleware
   */
  public addMiddleware(middleware: Handler): void {
    this.router.use(middleware);
  }
}