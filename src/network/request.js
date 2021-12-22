import axios from 'axios';

export function homeRequst(config){
  const instance = new axios.create({
    baseURL:'http://123.207.32.32:80002',
    timeout:10000
  });
  return  instance(config)
}

export function request(config){
  //1创建axios实例
  const instance = new axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  });
  //2axios拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config=>{
    //务必返回！
    //可以修改一些不符合服务器的要求内容
    //每次发送请求时 都希望再界面中显示一个请求图标
    //某些网络请求（比如登录token）,必须携带一些特殊的信息
    return config
  },error => {})

  //2.2响应拦截
  instance.interceptors.response.use(res=>{
    return res.data//务必返回
  },error => {})

  //3发送真正的网路请求
  //creat 方法本身会返回一个promise  调用的地方再继续实现then catch方法
  return  instance(config)
}
