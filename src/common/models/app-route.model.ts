import {Request, Response, NextFunction} from "express";

export enum RouteMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export interface AppRouteModel {
    prefix?: string;
    path: string;
    method: RouteMethod;
    handler: (req: Request, res: Response, next: NextFunction) => void;
}