import { css } from "@linaria/core";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const title = css`
  font-size: 100px;
  font-weight: bold;
`;

export default function Index() {
  return <div className={title}>HELLO</div>;
}
