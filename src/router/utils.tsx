import React from "react";
import { Link, Route } from "react-router-dom";

export interface RouteConfigItem {
  path: string;
  name: string;
  component?: React.ComponentType;
  children?: RouteConfigItem[];
}

export function renderMenu(config: RouteConfigItem[], parentPath: string = "") {
  return (
    <ul>
      {config.map(item => {
        const currenPath = `${parentPath}/${item.path}`;
        const { children } = item;
        if (Array.isArray(children)) {
          return (
            <li key={currenPath}>
              <p>{item.name}</p>
              {renderMenu(children, currenPath)}
            </li>
          );
        }
        return (
          <li key={currenPath}>
            <Link to={currenPath}>
              <p>{item.name}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function flattenConfig(
  config: RouteConfigItem[],
  parentPath: string = ""
): RouteConfigItem[] {
  return config.reduce((acc: RouteConfigItem[], cur: RouteConfigItem) => {
    const { children, path, ...restData } = cur;
    const flattenChildren = Array.isArray(children)
      ? flattenConfig(children, `${parentPath}/${cur.path}`)
      : [];
    return [
      ...acc,
      { ...restData, path: `${parentPath}/${cur.path}` },
      ...flattenChildren
    ];
  }, []);
}

export function renderRoute(config: RouteConfigItem[]) {
  return flattenConfig(config).map(item => (
    <Route key={item.path} path={item.path} exact component={item.component} />
  ));
}
