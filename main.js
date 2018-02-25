const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

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
    // quit app when closed
    mainWindow.on("closed", () => {
        app.quit();
    });

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // instert menu
    Menu.setApplicationMenu(mainMenu);
});

// handle create/add window
function createAddWindow() {
    // create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add Shopping List Item",
    });

    // load html file
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, "add-window.html"),
        protocol: "file",
        slashes: true,
    }));

    // garbage collection
    addWindow.on("close", () => {
        addWindow === null;
    })
}

// create menu template
const mainMenuTemplate = [{
    label: "File",
    submenu: [{
            label: "Add Item",
            click: () => {
                createAddWindow();
            }
        },
        { label: "Clear Items" },
        {
            label: "Quit",
            accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
            click: () => {
                app.quit();
            }
        }
    ]
}];

// if mac, add empty object ot menu
if (process.platform === "darwin") {
    mainMenuTemplate.unshift({});
}

// add developer tools item if not production
if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "Open Developer Tools",
        submenu: [{
            label: "Toggle DevTools",
            accelerator: process.platform == "darwin" ? "Command+D" : "Ctrl+D",
            click: (item, focusedWindow) => {
                focusedWindow.toggleDevTools();
            }
        }, {
            role: "reload",
        }]
    })
}