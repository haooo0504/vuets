import { Random } from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/upload/image",
    method: "post",
    response: ({}) => {
      return {
        errno: 0,
        code: 200,
        message: "δΈε³ζε",
        type: "success",
        result: {
          url: "/123.jpg",
        },
      };
    },
  },
] as MockMethod[];
