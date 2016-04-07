import express from 'express';
import fs from 'fs';
import path from 'path';
import { resemble } from 'resemble';
import reduce from 'async-reduce';
import exphbs from 'express-handlebars';

const app = express();
app.use(express.static('static'));
app.engine('.hbs', exphbs({ extname: '.hbs', layout: false }));
app.set('view engine', '.hbs');
app.set('views', './views');

const options = {}

    // start a server at {port}
    // 1. get all images in {baselineImageDirectory}
    // 2. for each of them
      // check if it has a 'new' version
      // compare new with old
      // if there is a diff threshold > {resemblejsThreshold}
        // add to {outputList} with base64diff
    // 3. pump out the {outputList} into html file at root
    // 4. host an API endpoint on same point
      // endpoints:
      // choose-image, post: baseline-image-name, baseline or new
        // sets either of the images into the baseline dir with filename

const dataImg = (f) => `data:image/png;base64,${f}`

const getImages = () => new Promise((resolve, reject) => {
  const baseImages = fs.readdirSync(options.baselineImageDirectory);

  const newImages = reduce(baseImages, [], (acc, currentImage, done) => {
    const basePath = path.join(options.baselineImageDirectory, currentImage);
    const newPath = path.join(options.newImageDirectory, currentImage);
    const baseImg = fs.readFileSync(basePath)
    const newImg = fs.readFileSync(newPath)

    resemble(newImg)
      .compareTo(baseImg)
      .onComplete((data) => {
        if (Number(data.misMatchPercentage) > options.resemblejsThreshold) {
          done(null, acc.concat([{
            baseImg: dataImg(baseImg.toString('base64')),
            newImg: dataImg(newImg.toString('base64')),
            diffImg: data.getImageDataUrl()
          }]))
        } else {
          done(null, acc)
        }
      })
  }, (err, result) => {
    resolve(result)
  });
})

app.get("/", (req, res) => {
  getImages().then(images => {
    res.render('index.hbs', {images});
  });
});

export default app;

/*
  - {baselineImageDirectory} string required
  - {getNewScreenshot} function(baseFilename) optional
  - {newImageDirectory} string optional (expects only files with same filename as baseline)
  - {resemblejsThreshold} number 0.1
*/
export function setupMiddleware(config) {
  options.baselineImageDirectory = config.baselineImageDirectory;
  options.getNewScreenshot = config.getNewScreenshot;
  options.newImageDirectory = config.newImageDirectory;
  options.resemblejsThreshold = config.resemblejsThreshold;
}