import { mathjax } from "mathjax-full/js/mathjax";
import { TeX } from "mathjax-full/js/input/tex";
import { SVG } from "mathjax-full/js/output/svg";
import { LiteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages";

const adaptor = new LiteAdaptor();
RegisterHTMLHandler(adaptor);

const html = mathjax.document("", {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: "none" }),
});

export function mathJaxSvg(expression: string) {
  const node = html.convert(expression, { display: true });
  console.log("Node: ", node);
  const svgOut = adaptor.firstChild(node).outerHTML;
  console.log("SVG: ", svgOut);
  const svgUrl = encodeURI("data:image/svg+xml;utf-8," + svgOut);
  return svgUrl;
}
