import App from "@/components/App";
import "@/index.pcss";
import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Helmet>
			<script
				async
				src="https://analytics.umami.is/script.js"
				data-website-id="d5f6f31c-f01f-4a86-942b-2f4bff151e15"
			/>
		</Helmet>
		<App />
	</React.StrictMode>
);
