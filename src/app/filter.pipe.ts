import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString:string, propName:string)
  {
    if(value.length===0 || filterString=='')
    {
        return value;
    }

    const resultArr = [];

    for(const item of value)
    {
      if(item["SOURCE"].toLowerCase()===filterString && item["DESTINATION"].toLowerCase()===propName)
      {
        resultArr.push(item);
      }
    }
    return resultArr
  }

}
