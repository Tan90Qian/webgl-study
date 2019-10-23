import { Home } from "src/pages/Home";

import { TwoZero } from "src/pages/chapter2/2-0";
import { TwoOne } from "src/pages/chapter2/2-1";
import { TwoTwo } from "src/pages/chapter2/2-2";
import { TwoThree } from "src/pages/chapter2/2-3";
import { TwoFour } from "src/pages/chapter2/2-4";
import { TwoFive } from "src/pages/chapter2/2-5";

import { ThreeOne } from "src/pages/chapter3/3-1";
import { ThreeTwo } from "src/pages/chapter3/3-2";

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
      },
      {
        path: "2-2",
        name: "2-2",
        component: TwoTwo
      },
      {
        path: "2-3",
        name: "2-3",
        component: TwoThree
      },
      {
        path: "2-4",
        name: "2-4",
        component: TwoFour
      },
      {
        path: "2-5",
        name: "2-5",
        component: TwoFive
      }
    ]
  },
  {
    path: "chapter3",
    name: "chapter3",
    children: [
      {
        path: "3-1",
        name: "3-1",
        component: ThreeOne
      },
      {
        path: "3-2",
        name: "3-2",
        component: ThreeTwo
      }
    ]
  }
];
