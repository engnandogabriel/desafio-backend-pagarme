import HttpResponse from '../HttpServer/HttpResponse';

export const success = (status: number, data: any): HttpResponse => ({
    statusCode: status,
    body: {
        type: 'Success',
        message: data.message,
        data: data.data,
    },
});

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: {
        type: 'ServerError',
        error: {
            name: error.name,
            message: error.message,
        },
    },
});

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: {
        type: 'BadRequest',
        error: {
            name: error.name,
            message: error.message,
        },
    },
});

export const notFound = (error: Error): HttpResponse => ({
    statusCode: 404,
    body: {
        type: 'NotFound',
        error: {
            name: error.name,
            message: error.message,
        },
    },
});
