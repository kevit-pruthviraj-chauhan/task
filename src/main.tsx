import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import App from "./App.tsx";
import { store } from "./stores/store";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element 404");

createRoot(rootElement).render(
	<StrictMode>
		<ThemeProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</StrictMode>,
);
