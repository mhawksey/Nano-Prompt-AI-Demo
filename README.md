# **Showcase: Gemini Nano Prompt API in a Google Workspace Add-on**

This repository demonstrates the capabilities of the experimental **Chrome Gemini Nano Prompt API** (`window.LanguageModel`) through a Google Workspace Editor add-on. The add-on allows users to generate and edit diagrams using natural language, primarily serving as an example to explore and showcase the on-device AI potential of Gemini Nano within Chrome extensions.

**The diagram generation feature was chosen specifically to test the capabilities of Gemini Nano in processing text-to-code tasks (MermaidJS).**

## **🚀 Key Highlights & Purpose**

* **Experimental Technology:** This project utilizes the **Prompt API, which is experimental and subject to change**. The primary goal is to explore its current capabilities and provide a practical example for developers interested in on-device AI.  
* **On-Device AI Demonstration:** It showcases how Gemini Nano can power AI features directly within the browser, operating on the user's device.  
* **Empowering Workspace Developers:** This example illustrates a potential future where Google Workspace developers can build add-ons with generative AI features that offer enhanced data privacy (as data can be processed locally) and potentially reduced operational costs (by minimizing server-side AI computation).

## **⚠️ IMPORTANT: Experimental API & Setup Requirements**

* **API Status:** The Prompt API is an experimental feature within Chrome. Its functionality and availability might change in future Chrome versions. Always refer to the latest [Chrome AI Documentation](https://developer.chrome.com/docs/extensions/ai/prompt-api) for up-to-date information.  
* **Chrome Version:**  
  * The Prompt API was introduced for experimentation, with an "Intent to Experiment" in Chrome 137\.  
  * As of Chrome 138, the `aiLanguageModelOriginTrial` permission is no longer required. It's recommended to use Chrome 138 or newer.  
* **Browser Configuration & Model Download:**  
  * Using this API requires specific Chrome versions (138+ recommended) and enabling experimental flags. The Gemini Nano model also needs to be downloaded by your browser.  
  * Detailed steps for setting up your browser environment, including enabling the necessary flags and ensuring the model is downloaded, are provided in the **"🚀 Getting Started / Setup (for this Demo Add-on) \> 1\. Environment Setup"** section below.  
* **Model Availability Check:** The API provides `LanguageModel.availability()` to check if the model is ready (`'readily'`), needs to be downloaded (`'after-download'`), or is unavailable (`'no'`). This add-on demonstrates handling these states.

## **✨ A Glimpse into the Future: On-Device GenAI for Workspace Developers**

The integration of the Prompt API in Chrome extensions opens up exciting possibilities for Google Workspace add-ons:

* **Enhanced Data Privacy:** By processing data on-device, sensitive user information within documents, sheets, or slides doesn't need to leave the user's machine for AI-powered analysis or generation, addressing key privacy concerns.  
* **Reduced Server-Side Costs:** Leveraging client-side AI can reduce or eliminate the need for server-side AI model hosting and API call costs for certain features.  
* **Responsive User Experience:** On-device processing can lead to faster interactions as network latency is minimized.  
* **Offline Capabilities (Potential):** Once the model is downloaded, some AI features could potentially work even without an active internet connection.

This diagram generator add-on is a practical example of these principles, performing tasks like text-to-diagram generation and code correction locally.

## **🔧 Example Use Case: AI-Powered Diagram Generation**

To demonstrate the Prompt API, this add-on provides the following diagramming functionalities within Google Docs, Sheets, and Slides:

* **Generate Diagrams from Text:** Users can describe a diagram (e.g., "flowchart for a login process"), and the add-on uses the Gemini Nano API to convert this into MermaidJS diagram code.  
* **Edit MermaidJS Code:** Users can directly input or modify MermaidJS code.  
* **Live Preview:** A real-time visual preview of the MermaidJS diagram is displayed.  
* **AI-Powered Diagram Fixing:** If MermaidJS code has errors, the API is used to attempt a correction.  
* **Insert Diagrams:** The final diagram can be inserted as a PNG image into the active Google Workspace editor.  
* **AI Model Status:** The add-on informs users about the Gemini Nano model's availability status.

## **💡 How this Add-on Leverages the Prompt API**

This add-on utilizes several key features of the Chrome `window.LanguageModel` API:

* **Model Availability Check (`LanguageModel.availability()`):**  
  * Before attempting any AI operations, the add-on calls `LanguageModel.availability()` to determine if the model is `readily` available, needs to be downloaded (`after-download`), or is currently unusable (`no`).  
  * This function also provides information about model capabilities like default `topK` and `temperature` values.  
* **Language Model Session Creation (`LanguageModel.create()`):**  
  * A language model session is created using `LanguageModel.create()`.  
  * **Download Monitoring:** If the model status is `'after-download'`, the `create` call can include a `monitor` function to listen for `downloadprogress` events, allowing the UI to update the user on the download status.  
  * **Initial Prompts (System Prompts):** The `initialPrompts` option is used to provide context to the Gemini Nano model. For example, a prompt like "You are an expert in MermaidJS. Output ONLY valid MermaidJS code based on the user's request." guides the AI to generate appropriate responses for diagram generation and fixing.  
  * **Session Customization (Potential):** The API allows customization of `topK` and `temperature` per session to influence the model's output. This example includes placeholders, demonstrating where these could be set.  
* **Prompting the Model (`session.prompt()`):**  
  * The core interaction with the AI happens via `session.prompt("user's text here")`.  
  * For diagram generation, the user's natural language description is sent as the prompt.  
  * For fixing errors, the faulty MermaidJS code along with the error message is provided to the model.  
* **Resource Management:**  
  * The add-on could be extended to use `session.destroy()` to free resources when a session is no longer needed.  
* **Error Handling:** Client-side JavaScript includes `try...catch` blocks to manage potential errors during API interactions.

*(Note: This example primarily uses `session.prompt()`. The Prompt API also supports `session.promptStreaming()` for handling longer, streaming responses, which could be beneficial for other types of generative tasks.)*

## **🛠️ Core Technologies in this Demonstrator**

* **Chrome Gemini Nano Prompt API (`window.LanguageModel`):** The core AI engine, running on-device in Chrome.  
* **Google Apps Script:** Provides the add-on framework, UI elements (sidebar, menus), and server-side functions for image insertion.  
* **MermaidJS:** Renders text-based diagram definitions into visual diagrams.  
* **HTML, CSS, JavaScript:** For the add-on's sidebar user interface and client-side logic.

## **⚙️ Project Structure**

* `Code.gs`: Server-side Apps Script logic (menu creation, sidebar display, image insertion).  
* `Sidebar.html`: HTML, CSS, and client-side JavaScript for the add-on's UI and Prompt API interaction.  
* `appsscript.json`: The add-on manifest file.  
* `README.md`: This file.  
* `LICENSE`: Apache 2.0 License.

## **🚀 Getting Started / Setup (for this Demo Add-on)**

This project is a demonstration Google Workspace Editor add-on.

### **1\. Environment Setup**

* **Google Chrome:** Ensure you are using a recent version of Google Chrome that supports the `window.LanguageModel` API (preferably Chrome 138 or newer).  
* **Enable Experimental Flags & Download Model:**  
  1. Open `chrome://flags/#prompt-api-for-gemini-nano` in Chrome, select 'Enabled', and relaunch.  
  2. Open `chrome://flags/#optimization-guide-on-device-model`, select 'Enabled BypassPrefRequirement', and relaunch Chrome.  
  3. After relaunching, the on-device model needs to be downloaded.  
     * You can try to trigger the download by navigating to `chrome://components`, finding "Optimization Guide On Device Model" (if listed), and clicking "Check for update".  
     * **If the above doesn't work or the component isn't visible:** Open Chrome DevTools (right-click \> Inspect \> Console) and run the following JavaScript. This actively tries to initialize the model and will show download progress in the console:  
       ```javascript
         const session = await LanguageModel.create({
           monitor(m) {
             m.addEventListener("downloadprogress", (e) => {
               console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
             });
           },
         });
       ```
     * Wait for the console to indicate the download is complete or the model is ready.

### **2\. Apps Script Project Setup**

* Create a new Google Apps Script project.  
* Copy the content of `Code.gs`, `Sidebar.html`, and `appsscript.json` into the corresponding files in your Apps Script project.

### **3\. Testing the Add-on**

Follow these steps to test the add-on using a test deployment:

#### *Create a test deployment* 

A test deployment is the combination of an add-on and a test document. Once you have a script version developed and would like to test it as an add-on, follow these steps:

1. If you don’t have one already, create a spreadsheet, document, presentation, or form to test the add-on with.  
2. Open the script project containing your add-on.  
3. Click **Deploy** \> **Test deployments**.  
4. Next to **Select type**, click Enable deployment types and select **Editor add-on**.  
5. Click **Create new test** or **Add test**.  
6. Choose a code version or select **Latest Code**.  
7. In the **Config** section, select the initial authorization state for the test.  
8. Under **Test document**, click **No document selected**. Select the Sheets, Docs, Slides, or Forms file you want to use to test the add-on and click **Insert**.  
9. Click **Save test**.

All saved test deployments appear in the **Test deployments** dialog. This lets you revisit the same test deployment later on.

#### *Run a test deployment* 

If you have one or more saved test deployments, you can run one of them by following these steps:

1. Open the script project containing your add-on.  
2. Click **Deploy** \> **Test deployments**.  
3. Under **Saved Tests**, select the radio button next to the saved test deployment you want to run and click **Execute**.

The test document opens in a new tab. The add-on is in the authorization state specified in the test deployment. You can verify that the add-on functions as intended by interacting with its menu and UI elements.

#### *Testing details* 

There are a number of things to keep in mind while testing Editor add-ons this way:

* Installable triggers aren't supported when testing. Functionality that depends on installable triggers is not testable.  
* While running a test deployment that’s set to test with the latest code, you can see changes saved to the add-on script by refreshing the test document.  
* The test document has a URL that you can share with editors of the original test document. This way, you can more easily collaborate with others while testing and developing.  
* If your add-on uses the Properties service, properties persist and remain available the next time the test deployment is run.  
* In addition, any test deployment that uses the same combination of add-on and test document has access to the same property information. For example, if you create two test deployments, the properties saved while running the first are available while running the second and vice versa, but only if the deployments use the same script and test document.  
* If you run a test deployment, you might be prompted for authorization if you have not run the script before. Be aware that authorizing a script while testing also authorizes the script outside of testing.

## **📖 How to Use (the Demo Add-on after Setup & Testing)**

1. **Open the Add-on:** Once the add-on is running in your test document (as per the testing steps above), find the add-on menu (e.g., "Gemini Diagram Showcase" or the name defined in your `Code.gs`) and select the option to show the sidebar.  
2. **Check AI Model Status:** The sidebar will indicate the Gemini Nano model's status (e.g., "AI is ready," "AI model is downloading...", "Built-in AI (LanguageModel API) is not available..."). If downloading, please wait for it to complete.  
3. **Generate/Edit/Fix Diagram:** Use the input fields and buttons in the sidebar to describe, generate, edit, or fix MermaidJS diagrams.  
4. **Insert Diagram:** Click "Insert Diagram into Document" to place the diagram as an image into your active Google Workspace file.

## **📚 Resources**

* **Prompt API Documentation (Chrome for Developers):** [https://developer.chrome.com/docs/extensions/ai/prompt-api](https://developer.chrome.com/docs/extensions/ai/prompt-api)  
* **People \+ AI Guidebook:** For best practices in designing with AI. ([https://pair.withgoogle.com/guidebook/](https://pair.withgoogle.com/guidebook/))  
* **Prompt API GitHub (Explainer & Issues):** ([https://github.com/explainers-by-googlers/prompt-api/](https://github.com/explainers-by-googlers/prompt-api/)) or ([https://github.com/webmachinelearning/prompt-api](https://github.com/webmachinelearning/prompt-api))  
* **MermaidJS Official Documentation:** [https://mermaid.js.org/](https://mermaid.js.org/)  
* **Participate & Share Feedback:**  
  * For feedback on Chrome's implementation: File a bug report or feature request via the Chromium issue tracker.  
  * For feedback on the API shape: Comment on issues in the Prompt API GitHub repository.

## **📜 License**

This project is licensed under the Apache License 2.0. See the `LICENSE` file for details.

## **🤝 Contributing**

As this is primarily a showcase of an experimental API, contributions that further demonstrate or explore the API's capabilities within this context are welcome. Please open an issue to discuss potential changes.
