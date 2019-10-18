import { Home } from "src/pages/Home";
import { TwoOne } from "src/pages/chapter2/2-1";
import { TwoTwo } from "src/pages/chapter2/2-2";

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
        path: "2-1",
        name: "2-1",
        component: TwoOne
      },
      {
        path: "2-2",
        name: "2-2",
        component: TwoTwo
      }
    ]
  }
];
