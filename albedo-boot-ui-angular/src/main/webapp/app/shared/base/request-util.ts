import { URLSearchParams, BaseRequestOptions, Response } from '@angular/http';
import { ResponseWrapper } from "./model/response-wrapper.model";

export const createRequestOption = (req?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        options.params = req;
    }
    return options;
};


export const convertResponse = (res: Response): ResponseWrapper => {
    const jsonResponse = res.json();
    return new ResponseWrapper(res.headers, jsonResponse, res.status);
}



