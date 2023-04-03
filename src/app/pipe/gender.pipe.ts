import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'genderPipe'
})
export class GenderPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (value === 'Muški' || value === 'Muško') {
            return 'Muškarac';
        }
        if (value === 'Ženski' || value === 'Žensko') {
            return 'Žena';
        }
        return value;
    }
}