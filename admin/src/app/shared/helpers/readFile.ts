import { Observable, Observer } from 'rxjs';

export const readFile = (file: File): Observable<string> => {
    return new Observable<string>((observer: Observer<string>) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            observer.next(reader.result as string);
            observer.complete();
        }
    })
}
