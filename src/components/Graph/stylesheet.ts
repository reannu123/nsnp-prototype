import cytoscape from "cytoscape";
import { mathJaxSvg } from "../../utils/mathJaxsvg";

let svg_math = mathJaxSvg("\\sum^N_i x_i+y_i \\xrightarrow{3}");

let stylesheet: cytoscape.Stylesheet[] = [
  {
    selector: ".neuron",
    css: {
      content: "data(label)",
      "text-valign": "top",
      "text-halign": "center",
      shape: "roundrectangle",
      "background-color": "white",
      "background-image": svg_math,
      "border-color": "black",
    },
  },
  {
    selector: ".function",
    css: {
      // content: "data(label)",
      "text-valign": "center",
      "text-halign": "center",
      "text-wrap": "wrap",
      "font-family": "Computer Modern",
      events: "no",
      "background-image": function (ele) {
        console.log("ele: ", ele.data("label"));
        return mathJaxSvg(ele.data("label"));
      },
      "background-color": "white",
      shape: "roundrectangle",
      width: 200,
      height: 125,
    },
  },
  {
    selector: "edge",
    css: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      // "target-arrow-color": "black",
      // "line-color": "black",
      "text-valign": "center",
      "text-halign": "center",
      "text-background-color": "white",
      "text-background-opacity": 1,
      "text-background-shape": "roundrectangle",
      "text-rotation": "autorotate",
      "text-margin-y": -5,
    },
  },
];

export default stylesheet;
