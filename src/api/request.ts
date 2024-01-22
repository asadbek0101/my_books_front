import axios from "axios";

// const _myKey: any = localStorage.getItem("MyKey");
// const _mySecret: any = localStorage.getItem("MySecret");

const _myKey = "asadbek@gmail.comKey";
const _mySecret = "asadbek@gmail.comSecret";

export const request = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    my_key: _myKey,
    secret: _mySecret,
    sign: "a04dfc0a2cad6d0665aedc00dcd29698",
  },
});
