export default interface HttpServer {
    on(method: string, url: string, callback: Function): any;
    listen(port: number): void;
}
