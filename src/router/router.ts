import { Home } from "src/pages/Home";
import { TwoZero } from "src/pages/chapter2/2-0";
import { TwoOne } from "src/pages/chapter2/2-1";

export const config = [
  {
    path: "",
    name: "Home",
    component: Home
  },
  {
    path: "chapter2",
    name: "chapter2",
    children: [
      {
        path: "2-0",
        name: "2-0",
        component: TwoZero
      },
      {
        path: "2-1",
        name: "2-1",
        component: TwoOne
      }
    ]
  }
];
