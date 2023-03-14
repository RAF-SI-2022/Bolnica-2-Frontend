import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'booleanDaNePipe'
})
export class BooleanDaNePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (value == true) {
            return 'Da';
        } else {
            return 'Ne';
        }
    }
}