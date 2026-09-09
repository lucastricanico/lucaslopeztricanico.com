import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("src", "dist", { recursive: true });
await mkdir("dist/vendor/liquid-gl", { recursive: true });
await cp("node_modules/liquid-gl/liquidGL.js", "dist/vendor/liquid-gl/liquidGL.js");
await cp("node_modules/liquid-gl/LICENSE", "dist/vendor/liquid-gl/LICENSE");
console.log("Portfolio ready in dist/");
