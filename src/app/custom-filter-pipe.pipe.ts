import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class CustomFilterPipePipe implements PipeTransform {

  transform(items: any, term: string, excludes: any = []): any {
    if (!term || !items) return items;
    return CustomFilterPipePipe.filter(items, term, excludes);
  }

  static filter(
    items: Array<{ [key: string]: any }>,
    term: string,
    excludes: any
  ): Array<{ [key: string]: any }> {
    const toCompare = term.toLowerCase().replace(/\s+/g, ' ');

    function checkInside(item: any, term: string) {
      if (
        typeof item === "string" &&
        item
          .toString()
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .includes(toCompare)
      ) {
        return true;
      }

      for (let property in item) {
        if (
          item[property] === null ||
          item[property] == undefined ||
          excludes.includes(property)
        ) {
          continue;
        }

        if (typeof item[property] === "object") {
          if (checkInside(item[property], term)) {
            return true;
          }
        } else if (
          item[property]
            .toString()
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .includes(toCompare)
        ) {
          return true;
        }
      }
      return false;
    }

    return items.filter(function (item) {
      return checkInside(item, term);
    });
  }

}
