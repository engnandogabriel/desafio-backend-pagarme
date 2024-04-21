export default interface UseCase {
    save(data: any): Promise<any>;
}
