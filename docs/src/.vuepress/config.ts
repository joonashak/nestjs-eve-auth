import { defaultTheme, defineUserConfig } from "vuepress";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import sidebar from "./sidebar";

export default defineUserConfig({
  lang: "en-US",
  title: "nestjs-eve-auth docs",
  description: "Documentation for @joonashak/nestjs-eve-auth library.",
  base: "/nestjs-eve-auth/",
  theme: defaultTheme({
    repo: "joonashak/nestjs-eve-auth",
    docsDir: "docs/src",
    contributors: false,
    sidebar,
  }),
  plugins: [copyCodePlugin()],
});
