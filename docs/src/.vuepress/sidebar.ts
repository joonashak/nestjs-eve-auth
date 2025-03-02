import { SidebarConfigArray } from "vuepress";

const sidebar: SidebarConfigArray = [
  "/index.md",
  {
    text: "Usage",
    children: ["/usage/installation.md", "/usage/configuration.md", "/usage/example.md"],
  },
  "/api/index.md",
  {
    text: "Development",
    children: ["/development/command-reference.md"],
  },
];

export default sidebar;
