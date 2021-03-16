import "./styles.css";
import { SvgBarRender, SvgGrad } from "./components/svgbar";
import { Gradient, Thing } from "./components/grad";

export default function App() {
  const grad = Gradient.fromHexs(["#34b4eb", "#c778e3", "#22eeFF"]);

  return (
    <div className="App">
      <h1>Gradient Grinder</h1>
      <h2>¯\_(ツ)_/¯</h2>
      <div id="main">
        <SvgBarRender gradient={grad} />
        <pre>{JSON.stringify(grad, null, 2)}</pre>
        <pre>{JSON.stringify(grad.asStops(), null, 2)}</pre>
        <pre>{JSON.stringify(Thing(), null, 2)}</pre>
      </div>
    </div>
  );
}
