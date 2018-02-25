const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// listen for app to bew ready

app.on("ready", () => {
    // create new window
    mainWindow = new BrowserWindow({});
    // load html file
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "main-window.html"),
        protocol: "file",
        slashes: true,
    }));

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // instert menu
    Menu.setApplicationMenu(mainMenu);
});

// create menu template
const mainMenuTemplate = [{
    label: "File",
    submenu: [
        { label: "Add Item" },
        { label: "Clear Items" },
        {
            label: "Quit",
            accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
            click: () => {
                app.quit();
            }
        }
    ]
}]