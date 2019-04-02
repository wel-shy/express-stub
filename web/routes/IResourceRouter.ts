import { NextFunction, Request, Response, Router } from 'express';
import IBaseResource from "../schemas/IBaseResource";

export default interface IResourceRouter<T extends IBaseResource> {
  store(req: Request, res: Response, next: NextFunction): Promise<void | Response> | void;
  index(req: Request, res: Response, next: NextFunction): Promise<void | Response> | void;
  show(req: Request, res: Response, next: NextFunction): Promise<void | Response> | void;
  search(req: Request, res: Response, next: NextFunction): Promise<void | Response> | void;
  paged(req: Request, res: Response, next: NextFunction): Promise<void | Response> | void;
  update(req: Request, res: Response, next: NextFunction): Promise<void | Response> | void;
  destroy(req: Request, res: Response, next: NextFunction): Promise<void | Response> | void;

  addDefaultRoutes(): void;
  setRouter(router: Router): void;
  getRouter(): Router;
}
