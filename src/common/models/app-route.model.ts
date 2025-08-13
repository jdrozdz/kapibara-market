import {Request, Response, NextFunction} from "express";

export enum RouteMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export interface AppRouteModel {
    path: string;
    method: RouteMethod;
    handler: (req: Request, res: Response, next: NextFunction) => void;
}