import { Random } from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/upload/image",
    method: "post",
    response: ({}) => {
      return {
        code: 200,
        message: "上傳成功",
        type: "success",
        result: {
          url: "/123.jpg",
        },
      };
    },
  },
] as MockMethod[];
