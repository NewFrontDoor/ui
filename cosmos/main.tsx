import { createRoot } from "react-dom/client";
import { mountDomRenderer } from "react-cosmos/dom";

import { moduleWrappers, rendererConfig } from "../cosmos.imports";

mountDomRenderer({
  rendererConfig,
  moduleWrappers,
  createRoot
});