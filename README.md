# Showcase: Gemini Nano Prompt API in a Google Workspace Add-on

This repository demonstrates the capabilities of the experimental **Chrome Gemini Nano Prompt API** (`window.LanguageModel`) through a Google Workspace Editor add-on. The add-on allows users to generate and edit diagrams using natural language, primarily serving as an example to explore and showcase the on-device AI potential of Gemini Nano within Chrome extensions.

**The diagram generation feature was chosen specifically to test the capabilities of Gemini Nano in processing text-to-code tasks (MermaidJS).**

## 🚀 Key Highlights & Purpose

* **Experimental Technology:** This project utilizes the **Prompt API, which is experimental and subject to change**. The primary goal is to explore its current capabilities and provide a practical example for developers interested in on-device AI.
* **On-Device AI Demonstration:** It showcases how Gemini Nano can power AI features directly within the browser, operating on the user's device.
* **Empowering Workspace Developers:** This example illustrates a potential future where Google Workspace developers can build add-ons with generative AI features that offer enhanced data privacy (as data can be processed locally) and potentially reduced operational costs (by minimizing server-side AI computation).

## ⚠️ IMPORTANT: Experimental API & Setup Requirements

* **API Status:** The Prompt API is an experimental feature within Chrome. Its functionality and availability might change in future Chrome versions. Always refer to the latest Chrome AI Documentation for up-to-date information.
* **Chrome Version:**
    * The Prompt API was introduced for experimentation, with an "Intent to Experiment" in Chrome 137.
    * As of Chrome 138, the `aiLanguageModelOriginTrial` permission is no longer required. It's recommended to use Chrome 138 or newer.
* **Browser Configuration:**
    * The Gemini Nano model, which powers the Prompt API, is downloaded by Chrome when an extension first attempts to use the API.
    * Depending on your Chrome version and configuration, you might need to enable specific flags in `chrome://flags` (e.g., search for "Experimental AI" or "On-Device Model" and ensure relevant settings are enabled) for the `window.LanguageModel` API to be available.
* **Model Availability:** The API provides a mechanism to check if the model is ready, needs to be downloaded, or is unavailable. This add-on demonstrates how to handle these states.

## ✨ A Glimpse into the Future: On-Device GenAI for Workspace Developers

The integration of the Prompt API in Chrome extensions opens up exciting possibilities for Google Workspace add-ons:

* **Enhanced Data Privacy:** By processing data on-device, sensitive user information within documents, sheets, or slides doesn't need to leave the user's machine for AI-powered analysis or generation, addressing key privacy concerns.
* **Reduced Server-Side Costs:** Leveraging client-side AI can reduce or eliminate the need for server-side AI model hosting and API call costs for certain features.
* **Responsive User Experience:** On-device processing can lead to faster interactions as network latency is minimized.
* **Offline Capabilities (Potential):** Once the model is downloaded, some AI features could potentially work even without an active internet connection.

This diagram generator add-on is a practical example of these principles, performing tasks like text-to-diagram generation and code correction locally.

## 🔧 Example Use Case: AI-Powered Diagram Generation

To demonstrate the Prompt API, this add-on provides the following diagramming functionalities within Google Docs, Sheets, and Slides:

* **Generate Diagrams from Text:** Users can describe a diagram (e.g., "flowchart for a login process"), and the add-on uses the Gemini Nano API to convert this into MermaidJS diagram code.
* **Edit MermaidJS Code:** Users can directly input or modify MermaidJS code.
* **Live Preview:** A real-time visual preview of the MermaidJS diagram is displayed.
* **AI-Powered Diagram Fixing:** If MermaidJS code has errors, the API is used to attempt a correction.
* **Insert Diagrams:** The final diagram can be inserted as a PNG image into the active Google Workspace editor.
* **AI Model Status:** The add-on informs users about the Gemini Nano model's availability status.

## 💡 How this Add-on Leverages the Prompt API

This add-on utilizes several key features of the Chrome `window.LanguageModel` API:

* **Model Availability Check (`LanguageModel.availability()`):**
    * Before attempting any AI operations, the add-on calls `LanguageModel.availability()` to determine if the model is `readily` available, needs to be downloaded (`after-download`), or is currently unusable (`no`).
    * This function also provides information about model capabilities like default `topK` and `temperature` values.
* **Language Model Session Creation (`LanguageModel.create()`):**
    * A language model session is created using `LanguageModel.create()`.
    * **Download Monitoring:** If the model status is `'after-download'`, the `create` call can include a `monitor` function to listen for `downloadprogress` events, allowing the UI to update the user on the download status.
    * **Initial Prompts (System Prompts):** The `initialPrompts` option (formerly `systemPrompt`) is used to provide context to the Gemini Nano model. For example, a prompt like "You are an expert in MermaidJS. Output ONLY valid MermaidJS code based on the user's request." guides the AI to generate appropriate responses for diagram generation and fixing.
    * **Session Customization (Potential):** The API allows customization of `topK` and `temperature` per session to influence the model's output. This example includes placeholders, demonstrating where these could be set.
* **Prompting the Model (`session.prompt()`):**
    * The core interaction with the AI happens via `session.prompt("user's text here")`.
    * For diagram generation, the user's natural language description is sent as the prompt.
    * For fixing errors, the faulty MermaidJS code along with the error message is provided to the model.
* **Resource Management:**
    * The add-on could be extended to use `session.destroy()` to free resources when a session is no longer needed, especially for long-lived applications.
* **Error Handling:** Client-side JavaScript includes `try...catch` blocks to manage potential errors during API interactions.

*(Note: This example primarily uses `session.prompt()`. The Prompt API also supports `session.promptStreaming()` for handling longer, streaming responses, which could be beneficial for other types of generative tasks.)*

## 🛠️ Core Technologies in this Demonstrator

* **Chrome Gemini Nano Prompt API (`window.LanguageModel`):** The core AI engine, running on-device in Chrome.
* **Google Apps Script:** Provides the add-on framework, UI elements (sidebar, menus), and server-side functions for image insertion.
* **MermaidJS:** Renders text-based diagram definitions into visual diagrams.
* **HTML, CSS, JavaScript:** For the add-on's sidebar user interface and client-side logic.

## ⚙️ Project Structure

* `Code.gs`: Server-side Apps Script logic (menu creation, sidebar display, image insertion).
* `Sidebar.html`: HTML, CSS, and client-side JavaScript for the add-on's UI and Prompt API interaction.
* `appsscript.json`: The add-on manifest file.
* `README.md`: This file.
* `LICENSE`: Apache 2.0 License.

## 🚀 Getting Started / Setup (for this Demo Add-on)

This project is a demonstration Google Workspace Editor add-on. To use or test it:

1.  **Environment:**
    * **Google Chrome:** Ensure you are using a recent version of Google Chrome that supports the `window.LanguageModel` API (preferably Chrome 138 or newer).
    * **Enable Flags (if needed):** Navigate to `chrome://flags`. Search for flags related to "Experimental AI", "On-Device Model", or similar terms, and ensure they are enabled if the API isn't active by default. The exact flag names can change, so refer to recent Chrome developer resources if unsure.
2.  **Apps Script Project:**
    * Create a new Google Apps Script project.
    * Copy the content of `Code.gs`, `Sidebar.html`, and `appsscript.json` into the corresponding files in your Apps Script project.
3.  **Deployment (for testing):**
    * In the Apps Script editor, go to "Deploy" > "New deployment".
    * Select type: "Editor Add-on".
    * Provide a description and click "Deploy".
    * Authorize the script's required permissions.
4.  **Installation (for testing deployed version):**
    * Use the Add-on ID from the deployment to install it for your account, or run directly from the Apps Script editor for development by selecting `onOpen` and running it, then opening a Google Doc, Sheet, or Slide.

## 📖 How to Use (the Demo Add-on)

1.  **Open the Add-on:** In a Google Document, Sheet, or Slide, find the add-on menu (e.g., "Gemini Diagram Showcase") and select the option to show the sidebar.
2.  **Check AI Model Status:** The sidebar will indicate the Gemini Nano model's status (e.g., "AI is ready," "AI model is downloading...", "Built-in AI (LanguageModel API) is not available..."). If downloading, please wait for it to complete.
3.  **Generate/Edit/Fix Diagram:** Use the input fields and buttons in the sidebar to describe, generate, edit, or fix MermaidJS diagrams.
4.  **Insert Diagram:** Click "Insert Diagram into Document" to place the diagram as an image into your active Google Workspace file.

## 📚 Resources

* **Prompt API Documentation (Chrome for Developers):** [https://developer.chrome.com/docs/extensions/ai/prompt-api](https://developer.chrome.com/docs/extensions/ai/prompt-api)
* **People + AI Guidebook:** For best practices in designing with AI. (https://pair.withgoogle.com/guidebook/)
* **Prompt API GitHub (Explainer & Issues):** (https://github.com/webmachinelearning/prompt-api) or the newer explainer link if available from the docs.
* **MermaidJS Official Documentation:** [https://mermaid.js.org/](https://mermaid.js.org/)
* **Participate & Share Feedback:**
    * For feedback on Chrome's implementation: File a bug report or feature request via the Chromium issue tracker.
    * For feedback on the API shape: Comment on issues in the Prompt API GitHub repository.

## 📜 License

This project is licensed under the Apache License 2.0. See the `LICENSE` file for details.

## 🤝 Contributing

As this is primarily a showcase of an experimental API, contributions that further demonstrate or explore the API's capabilities within this context are welcome. Please open an issue to discuss potential changes.
