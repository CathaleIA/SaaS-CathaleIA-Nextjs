import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // This tells Next.js to export a static build to the `out` folder
  output: "export",

  // This tells Next.js to export pages as "folders with an `index.html` file inside"
  // We use this option so we can avoid having the `.html` extension at the end of the page URLs.
  trailingSlash: true,
};

export default nextConfig;
