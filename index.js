import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import qr from 'qr-image';
import fs from "fs";
import http from "http";

const app = express();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.writeHead('Content-Type', 'text/plain');
  res.end('Hello World');
})

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    const url = req.body["URL"];
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('public/qr_img.png'));

    console.log(`QR code generated for: ${url}`);

    res.render("index.ejs", { URL: url});
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});