import {request} from "./request";

export function homeRequst(){
  return request({
    url:'/home/multidata'
  })
}
