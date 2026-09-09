import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("src", "dist", { recursive: true });
await mkdir("dist/vendor/liquid-glass", { recursive: true });
await cp("node_modules/@dpawlikowski/liquid-glass/src", "dist/vendor/liquid-glass", { recursive: true });
await cp("node_modules/@dpawlikowski/liquid-glass/LICENSE", "dist/vendor/liquid-glass/LICENSE");
await mkdir("dist/vendor/liquid-gl", { recursive: true });
await cp("node_modules/liquid-gl/liquidGL.js", "dist/vendor/liquid-gl/liquidGL.js");
await cp("node_modules/liquid-gl/LICENSE", "dist/vendor/liquid-gl/LICENSE");
await mkdir("dist/vendor/simple-liquid-glass", { recursive: true });
for (const file of ["LICENSE", "THIRD_PARTY_NOTICES.md"]) {
  await cp(`node_modules/simple-liquid-glass/${file}`, `dist/vendor/simple-liquid-glass/${file}`);
}
await cp("node_modules/simple-liquid-glass/dist/web-component.esm.js", "dist/vendor/simple-liquid-glass/web-component.esm.js");
await mkdir("dist/vendor/ybouane-liquidglass", { recursive: true });
await cp("node_modules/@ybouane/liquidglass/dist/index.js", "dist/vendor/ybouane-liquidglass/index.js");
for (const file of ["package.json", "README.md"]) {
  await cp(`node_modules/@ybouane/liquidglass/${file}`, `dist/vendor/ybouane-liquidglass/${file}`);
}
console.log("Portfolio ready in dist/");
