import { request } from '../utils/request';

export async function queryList(params) {
  //console.log("queryList",params);
  const { page, len, queryMap, url, columnProp, columnOrder } = params;
  return request(url, {
    method: 'POST',
    body: {
      page,
      len,
      ...queryMap,
      columnProp,
      columnOrder,
    },
  });
}

export async function queryReport(params) {
  //console.log("queryList",params);
  const { queryMap, url, orderby1, orderby2 } = params;
  return request(url, {
    method: 'POST',
    body: {
      ...queryMap,
      orderby1,
      orderby2,
    },
  });
}
