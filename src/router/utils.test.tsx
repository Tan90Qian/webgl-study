import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
import { Link } from "react-router-dom";

import { RouteConfigItem, flattenConfig, renderMenu } from "./utils";

let config: RouteConfigItem[];

beforeEach(() => {
  config = [
    {
      path: "a",
      name: "a",
      children: [
        {
          path: "aa",
          name: "aa"
        }
      ]
    },
    {
      path: "b",
      name: "b"
    }
  ];
});

it("flattenConfig will flatten config array", () => {
  expect(flattenConfig(config, "")).toEqual([
    { path: "/a", name: "a" },
    { path: "/a/aa", name: "aa" },
    { path: "/b", name: "b" }
  ]);
});

it("return unflatten nav list", () => {
  const Menu = () => {
    return renderMenu(config);
  };

  const wrapper = shallow(<Menu />);

  expect(
    wrapper.equals(
      <ul>
        <li key="/a">
          <p>a</p>
          <ul>
            <li key="/a/aa">
              <Link to="/a/aa">
                <p>aa</p>
              </Link>
            </li>
          </ul>
        </li>
        <li key="/b">
          <Link to="/b">
            <p>b</p>
          </Link>
        </li>
      </ul>
    )
  ).toEqual(true);
});
