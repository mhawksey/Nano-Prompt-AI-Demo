# **Showcase: Gemini Nano Prompt API in a Google Workspace Add-on**

This repository demonstrates the capabilities of the experimental **Chrome Gemini Nano Prompt API** (`LanguageModel`) through a Google Workspace Editor add-on. The add-on allows users to generate and edit diagrams using natural language, primarily serving as an example to explore and showcase the on-device AI potential of Gemini Nano within Chrome extensions.

**The diagram generation feature was chosen specifically to test the capabilities of Gemini Nano in processing text-to-markdown tasks (MermaidJS).**

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

* **Google Chrome:** Ensure you are using a recent version of Google Chrome that supports the `LanguageModel` API (preferably Chrome 138 or newer).  
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

> The test document has a URL that you can share with editors of the original test document. This way, you can more easily collaborate with others while testing and developing.  

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
