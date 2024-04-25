import HttpResponse from '../HttpServer/HttpResponse';

export const success = (status: number, data: any): HttpResponse => ({
    statusCode: status,
    body: {
        type: 'Success',
        message: data.message,
        data: data.data,
    },
});
