import dsbridge from 'dsbridge';
// @ts-ignore
window.dsBridge = dsbridge;

// @ts-ignore
import dsbridgeAdapter from 'flyio/dist/npm/adapter/dsbridge';
// @ts-ignore
import EngineWarpper from 'flyio/dist/npm/engine-wrapper';
// @ts-ignore
import Fly from 'flyio/dist/npm/fly';

const dsEngie = EngineWarpper(dsbridgeAdapter);

const fly = new Fly(dsEngie);

// fly.interceptors.request.use((request: any) => {
//     return request;
// });

// fly.interceptors.response.use(
//     (response: any) => {
//         return response;
//     },
//     (err: Error) => {        
//         return err;
//     },
// );

export default fly;