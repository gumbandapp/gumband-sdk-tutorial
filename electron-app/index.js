const { app, BrowserWindow } = require('electron');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 700,
    height: 1000,
    webPreferences: {
      preload: `${__dirname}/preload.js`
    }
  })

  win.loadFile('index.html');
  return win;
}

app.whenReady().then(() => {
  createWindow();
});


