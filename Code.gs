/**
 * Get the active Google Workspace application.
 *
 * @return {Object} The active application class (e.g., DocumentApp, SpreadsheetApp).
 */
const getContainer = () => {
  const apps = [DocumentApp, SpreadsheetApp, SlidesApp]; // Limited to Docs, Sheets, Slides
  const activeApp = apps.find((app) => {
    try {
      app.getUi();
      return true;
    } catch (f) {
      return false;
    }
  });

  return activeApp;
};

/**
 * Create a custom menu when the document is opened.
 */
const onOpen = () => {
  const app = getContainer();
  const ui = app.getUi();
  const menu = ui.createAddonMenu();
  menu.addItem('✨ Generate a diagram', 'showSidebar');
  menu.addToUi();
};

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
const onInstall = (e) => {
  onOpen(e);
}

/**
 * Render the text content of the current document in the sidebar.
 */
const showSidebar = () => {
  const app = getContainer();
  // Create the sidebar HTML.
  const ui = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Built-in AI');
  app.getUi().showSidebar(ui);
}

// --- Image Insertion Logic ---

/**
 * Inserts a base64 encoded PNG image into the active Document, Slide, or Sheet.
 * Called from the client-side JavaScript in the sidebar via google.script.run.
 * Retrieves the host application type from User Properties.
 *
 * @param {string} base64ImageData The PNG image data, base64 encoded (without the data:image/png;base64, prefix).
 * @return {string} A success message or throws an error.
 */
function insertMermaidImage(base64ImageData) {
  const container = getContainer();
  if (!base64ImageData) {
    throw new Error("No image data received.");
  }

  let imageBlob;
  try {
    imageBlob = Utilities.newBlob(
      Utilities.base64Decode(base64ImageData),
      'image/png',
      'mermaid_diagram.png' // Filename for the blob
    );
  } catch (e) {
    console.error("Error creating blob from base64 data: " + e);
    throw new Error("Failed to decode image data on the server.");
  }

  // Determine the active application and insert the image based on stored property
  try {
    // Check if the container is DocumentApp
    if (container === DocumentApp) {
      const doc = DocumentApp.getActiveDocument();
      if (!doc) throw new Error("No active Google Document found.");
      const cursor = doc.getCursor();
      if (cursor) {
        const insertedImage = cursor.insertInlineImage(imageBlob);
        console.log(`Inserted image in Doc. Dims: ${insertedImage.getWidth()}x${insertedImage.getHeight()}`);
        return "Image inserted in Document.";
      } else {
        const insertedImage = doc.getBody().appendImage(imageBlob);
        console.log(`Appended image to Doc body. Dims: ${insertedImage.getWidth()}x${insertedImage.getHeight()}`);
        return "Image appended to Document body.";
      }
    }
    // Check if the container is SlidesApp
    else if (container === SlidesApp) {
      const presentation = SlidesApp.getActivePresentation();
      if (!presentation) throw new Error("No active Google Slides presentation found.");
      const selection = presentation.getSelection();
      const currentPage = selection.getCurrentPage();

      if (currentPage) {
        const insertedImage = currentPage.insertImage(imageBlob);
        console.log(`Inserted image ID: ${insertedImage.getObjectId()} on slide ${currentPage.getObjectId()}`);
        // Center the image (optional)
        const pageWidth = presentation.getPageWidth();
        const pageHeight = presentation.getPageHeight();
        insertedImage.setLeft((pageWidth - insertedImage.getWidth()) / 2);
        insertedImage.setTop((pageHeight - insertedImage.getHeight()) / 2);
        return "Image inserted in Slide.";
      } else {
        // If no page is selected, try inserting on the first slide as a fallback
        const firstSlide = presentation.getSlides()[0];
        if (firstSlide) {
          const insertedImage = firstSlide.insertImage(imageBlob);
          console.log(`Inserted image ID: ${insertedImage.getObjectId()} on first slide ${firstSlide.getObjectId()} (no active page selection)`);
          const pageWidth = presentation.getPageWidth();
          const pageHeight = presentation.getPageHeight();
          insertedImage.setLeft((pageWidth - insertedImage.getWidth()) / 2);
          insertedImage.setTop((pageHeight - insertedImage.getHeight()) / 2);
          return "Image inserted on the first slide.";
        } else {
          throw new Error("No slide selected or active, and no slides found in presentation.");
        }
      }
    }
    // Check if the container is SpreadsheetApp
    else if (container === SpreadsheetApp) {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      if (!ss) throw new Error("No active Google Sheet found.");
      const sheet = ss.getActiveSheet();
      const cell = sheet.getActiveCell();
      // Ensure the imageBlob is valid before inserting
      if (!imageBlob || typeof imageBlob.getAs !== 'function') {
        throw new Error("Invalid imageBlob provided for SpreadsheetApp.");
      }
      const insertedImage = sheet.insertImage(imageBlob, cell.getColumn(), cell.getRow());
      console.log(`Inserted image in sheet "${sheet.getName()}" at ${cell.getA1Notation()}`);
      return "Image inserted in Sheet.";
    }
    // Fallback for unsupported application
    else {
      // This case should ideally not be reached if getContainer works as expected
      // and only returns DocumentApp, SpreadsheetApp, or SlidesApp.
      let appName = "Unknown App";
      if (container && typeof container.getUi === 'function') {
        // Attempt to get a more descriptive name if possible, though `getName()` isn't standard across all app types.
        // This is a best-effort for logging.
        if (container === DocumentApp) appName = "DocumentApp";
        else if (container === SpreadsheetApp) appName = "SpreadsheetApp";
        else if (container === SlidesApp) appName = "SlidesApp";
      }
      throw new Error("Unsupported application type: " + appName);
    }
  } catch (e) {
    console.error(`Error inserting image into ${app}: ${e}`);
    if (e.message.includes("limit")) {
      throw new Error("Failed to insert image. It might be too large or complex for the document.");
    }
    // Add specific checks for common errors
    if (e.message.includes("timed out")) {
      throw new Error("Operation timed out. The document might be too complex or busy.");
    }
    if (e.message.includes("Access denied") || e.message.includes("does not have permission")) {
      throw new Error("Permission error. Please ensure the add-on has the necessary authorization.");
    }
    throw new Error(`Server error inserting image into ${app}: ${e.message}`);
  }
}

/**
 * Simple function to test if the server is reachable from the client.
 * @return {string} A confirmation message.
 */
function pingServer() {
  console.log("Server pinged successfully by client.");
  const hostApp = PropertiesService.getDocumentProperties().getProperty(HOST_APP_PROPERTY_KEY);
  return `Server connection successful. Detected host: ${hostApp || 'Not set yet'}`;
}
