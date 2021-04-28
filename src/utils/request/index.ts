import __fly from './bridge/__fly';
import __fly_native from './bridge/__fly_native';
import * as core from '@/utils/core';
import { commonHeaders, commonParams } from './common';

export enum Source {
  serve = 'SERVE',
  native = 'NATIVE',
}

export interface Info {
  type: string;
  url?: string;
  path?: string;
  baseUrl?: string | null;
  headers?: { [key: string]: string | null; };
  params?: any;
  source?: Source;
  timeout?: number;
}

export default function request(info: Info): Promise<any> {
  console.assert(core.isNotEmpty(info.path) || core.isNotEmpty(info.url), 'url 和 path 不能都为空');
  const _type = info.type;
  const _baseUrl = info.baseUrl ?? import.meta.env.BASE_URL;
  const _url = info.url ?? (_baseUrl + info.path);
  const _timeout = info.timeout ?? 60000;
  const _source = info.source ?? Source.serve;
  let _headers = commonHeaders;
  let _params = commonParams;
  if (info.headers) {
    _headers = { ...info.headers, ...commonHeaders };
  }
  if (info.params) {
    _params = { ...info.params, ...commonParams };
  }
  function fly() {
    switch (_source) {
      case Source.serve:
        return __fly;
      case Source.native:
        return __fly_native;
    }
  }
  return new Promise((reserve, reject) => {
    fly().request(_url, _params, {
      method: _type,
      headers: _headers,
      timeout: _timeout,
    }).then((resp: any) => {
      reserve(resp);
    })
    .catch((err: any) => {
      reject(err);
    });
  });
}
