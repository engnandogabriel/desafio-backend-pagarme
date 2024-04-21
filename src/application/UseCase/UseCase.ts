import HttpResponse from '../../domain/HttpServer/HttpResponse';
export default interface UseCase {
    execute(data: any): Promise<HttpResponse>;
}
