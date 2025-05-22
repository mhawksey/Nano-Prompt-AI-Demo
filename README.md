# AI-Powered Diagram Generator for Google Workspace

This Google Workspace Editor add-on leverages the Chrome Gemini Nano Prompt API to empower users to generate diagrams from text descriptions, edit existing MermaidJS code, and seamlessly insert these diagrams as images directly into their Google Docs, Sheets, and Slides.

## Features

*   **Generate Diagrams from Text:** Describe your diagram using natural language (e.g., "flowchart for a login process"). The add-on utilizes the Gemini Nano API to convert your description into MermaidJS diagram code.
*   **Edit MermaidJS Code:** Directly input, paste, or modify MermaidJS code in an intuitive sidebar editor.
*   **Live Preview:** Instantly visualize your MermaidJS diagram as you type or after AI generation. The preview updates in real-time.
*   **AI-Powered Diagram Fixing:** If your manually written or AI-generated MermaidJS code contains syntax errors, the add-on can leverage the Gemini Nano API to analyze the error and suggest a corrected version of the code.
*   **Customizable Image Width:** Specify the desired width (in pixels) for the output PNG image before insertion.
*   **Insert Diagrams into Workspace:** Insert the final diagram as a PNG image into your active Google Document, Spreadsheet (into the active cell), or Presentation (onto the current slide).
*   **Cross-Platform Compatibility:** Functions consistently across Google Docs, Google Sheets, and Google Slides.
*   **AI Model Status:** The sidebar informs users about the availability of the Gemini Nano model (e.g., ready, downloading, unavailable).

## How it Works

The add-on integrates client-side AI processing with Google Apps Script for a seamless user experience:

1.  **User Input:** The user either types a natural language description for a diagram or inputs/edits MermaidJS code directly in the add-on sidebar.
2.  **AI Processing (Gemini Nano):**
    *   **Generation:** For text descriptions, the client-side JavaScript calls the `LanguageModel.prompt()` method of the Chrome Gemini Nano Prompt API. A carefully crafted system prompt guides the AI to return valid MermaidJS code.
    *   **Fixing:** If existing MermaidJS code has rendering errors, the erroneous code along with the error message is sent to the Gemini Nano model via `LanguageModel.prompt()` to attempt a fix.
3.  **MermaidJS Rendering:** The `mermaid.min.js` library (included in the sidebar) renders the generated or manually entered MermaidJS code into an SVG preview within the sidebar.
4.  **Image Conversion & Insertion:**
    *   When the user clicks "Insert Diagram," the client-side script converts the SVG preview into a base64 encoded PNG image.
    *   This image data is sent to a server-side Google Apps Script function (`insertMermaidImage` in `Code.gs`).
    *   The Apps Script function then inserts the PNG image into the active Google Workspace editor.

## Core Technologies Used

*   **Google Apps Script:** Provides the core add-on framework, enables UI elements like the sidebar and menu items, and handles server-side operations like inserting images into Google Workspace documents.
*   **Chrome Gemini Nano Prompt API (`window.LanguageModel`):** The backbone for the AI features. It runs on-device in Chrome, allowing for quick and privacy-preserving generation and correction of MermaidJS code.
*   **MermaidJS:** A JavaScript library that takes Markdown-inspired text definitions and renders them as diagrams and charts. Used here for both live previews and the final diagram structure.
*   **HTML, CSS, JavaScript:** Standard web technologies used to structure, style, and create the interactive user interface within the add-on sidebar.

## Project Structure

*   `Code.gs`: This Apps Script file contains the server-side logic.
    *   `onOpen()`, `onInstall()`: Handle add-on setup, creating a custom menu in the Google Workspace editor.
    *   `showSidebar()`: Displays the HTML-based sidebar to the user.
    *   `getContainer()`: Detects whether the add-on is running in Docs, Sheets, or Slides.
    *   `insertMermaidImage(base64ImageData)`: Receives base64 PNG data from the sidebar and inserts it into the appropriate active document, sheet, or slide.
    *   `pingServer()`: A simple test function.
*   `Sidebar.html`: Defines the complete user interface for the add-on's sidebar.
    *   **HTML:** Structures the input areas for text prompts and Mermaid code, buttons for actions (generate, render, insert, fix), preview area, and status messages.
    *   **CSS:** Styles the sidebar for a clean and user-friendly experience.
    *   **JavaScript (Client-Side):**
        *   Initializes and interacts with the `LanguageModel` (Gemini Nano API).
        *   Handles user input for diagram descriptions and Mermaid code.
        *   Calls `mermaid.render()` to display diagram previews.
        *   Manages AI model availability status and user notifications.
        *   Converts SVG diagrams to PNG data for insertion.
        *   Communicates with `Code.gs` using `google.script.run` to trigger image insertion.
*   `appsscript.json`: The manifest file for the Google Apps Script project. It defines project dependencies, authorization scopes, time zone, runtime version, and metadata required for the add-on to function correctly within Google Workspace.
*   `README.md`: This documentation file.
*   `LICENSE`: Contains the Apache 2.0 license under which this project is distributed.

## Getting Started / Setup

This project is a demonstration Google Workspace Editor add-on. To use or test it:

1.  **Environment:** You need a modern version of Google Chrome that supports the Gemini Nano Prompt API ( `window.LanguageModel`). Some features might require enabling specific flags in `chrome://flags` if the model isn't readily available (e.g., search for "Experimental AI" or "On-Device Model").
2.  **Apps Script Project:**
    *   Create a new Google Apps Script project or use an existing one.
    *   Copy the content of `Code.gs`, `Sidebar.html`, and `appsscript.json` into the corresponding files in your Apps Script project.
3.  **Deployment:**
    *   In the Apps Script editor, go to "Deploy" > "New deployment".
    *   For "Select type", click the gear icon and choose "Editor Add-on".
    *   Provide a description and click "Deploy".
    *   You will be prompted to authorize the script's required permissions.
4.  **Installation (for testing deployed version):**
    *   After deployment, you'll get an Add-on ID. You might need to install it for your account using this ID or by sharing it appropriately for testing.
    *   Alternatively, you can run the add-on directly from the Apps Script editor for development testing by selecting a function like `onOpen` and running it, then opening a relevant Google Workspace document.

## How to Use

1.  **Open the Add-on:**
    *   Open a Google Document, Sheet, or Slide.
    *   An add-on menu (likely named based on your deployment, e.g., "Gemini Diagram Generator") will appear in the menu bar.
    *   Click this menu and select "✨ Generate a diagram" (or the item defined in `onOpen`) to launch the sidebar.
2.  **Check AI Model Status:** The sidebar will display messages about the Gemini Nano model's status (e.g., "AI is ready," "AI model is downloading...", "Built-in AI (LanguageModel API) is not available...").
3.  **Generate Diagram from Description:**
    *   In the "Describe your diagram" text area, type a clear description of the diagram you want (e.g., "A sequence diagram for a user logging into a website").
    *   Click the "Generate Diagram from Description" button.
    *   The AI will process your request. The generated MermaidJS code will appear in the "MermaidJS Code" text area below, and a visual preview will be rendered in the "Preview" section.
4.  **Write or Edit MermaidJS Code Manually:**
    *   You can type MermaidJS code directly into the "MermaidJS Code" text area or paste existing code.
    *   Click the "Render Diagram from Code" button to update the preview section with your changes.
5.  **Fix Diagram with AI:**
    *   If the MermaidJS code has errors (e.g., after manual editing or if the AI generates imperfect code), an error message will typically appear above or in the preview area.
    *   The "Fix Diagram with AI" button will become visible. Click it.
    *   The add-on will send the faulty code and the error message to the Gemini Nano model. The AI's suggested fix will replace the content of the "MermaidJS Code" text area, and the preview will update.
6.  **Insert Diagram into Document:**
    *   Once you are satisfied with the preview, you can optionally specify a width for the image in the "Width (px):" input field (default is 1200px).
    *   Click the "Insert Diagram into Document" button.
    *   The diagram will be converted to a PNG image and inserted into your active Google Document (at the cursor position or appended), Sheet (in the currently active cell/range), or Slide (on the current slide).

## Key Gemini Nano Prompt API Features Used (`window.LanguageModel`)

This add-on effectively demonstrates several powerful features of the Chrome built-in AI Prompt API:

*   **Model Availability Check (`LanguageModel.availability()`):** The add-on checks the status of the Gemini Nano model (`available`, `downloadable`, `downloading`, `unavailable`) and informs the user, enabling a graceful experience even if the AI isn't immediately ready.
*   **Session Creation (`LanguageModel.create(sessionOptions)`):**
    *   **System Prompts (`initialPrompts`):** A crucial feature used to guide the AI. The add-on provides a system prompt (e.g., "You are an expert in MermaidJS... Output ONLY the MermaidJS code...") to ensure the model's responses are constrained to valid and directly usable MermaidJS syntax. This is used for both diagram generation and the fixing feature.
    *   **Download Monitoring (`monitor`):** The `monitor` option in `sessionOptions` allows the add-on to listen to `downloadprogress` events, providing feedback to the user if the AI model needs to be downloaded.
    *   **Custom Parameters (Potential):** The code includes `globalTemperature` and `globalTopK` variables, demonstrating where one might set `temperature` and `topK` in `sessionOptions` to influence the AI's output randomness and creativity, though they are currently set to fairly neutral values.
*   **Prompting (`languageModelSession.prompt(text)`):** This is the core function for interacting with the AI. The add-on sends the user's natural language description or the erroneous Mermaid code (with its error context) to the model.
*   **Error Handling:** The client-side JavaScript includes `try...catch` blocks to manage potential errors during API interactions (e.g., if the model is unavailable or a prompt fails).

## Resources

*   **Chrome AI Documentation - Prompt API:** [https://developer.chrome.com/docs/extensions/ai/prompt-api](https://developer.chrome.com/docs/extensions/ai/prompt-api)
*   **Prompt API GitHub Explainer:** [https://github.com/webmachinelearning/prompt-api](https://github.com/webmachinelearning/prompt-api)
*   **MermaidJS Official Documentation:** [https://mermaid.js.org/](https://mermaid.js.org/)

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to open an issue or submit a pull request.