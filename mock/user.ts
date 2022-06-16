import { Random } from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/info",
    method: "get",
    response: ({}) => {
      return {
        code: 200,
        message: "成功",
        type: "success",
        result: {
          name: "vben",
          age: 18,
          avatar: "/123.jpg",
          token: Random.string(10),
        },
      };
    },
  },
  {
    url: "/api/login",
    method: "post",
    response: ({}) => {
      return {
        code: 200,
        message: "登入成功",
        type: "success",
        result: {
          token: Random.string(10),
        },
      };
    },
  },
] as MockMethod[];
