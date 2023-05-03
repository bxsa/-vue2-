import {v4 as uuidv4}  from "uuid";
//要生成一个随机的字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID=()=>{
    //先从本地存储中获取数据
    let uuid_token =localStorage.getItem('UUIDTOKEN');
    //如果本地存储中没有数据，则触发一次这个函数。生成一个数据，然后存储进本地存储中
    if(!uuid_token){
        uuid_token=uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}