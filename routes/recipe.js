const router = require("express").Router();
const recipe = require("../models/recipeSchema");
const { upload, gfs_pointer } = require("../middleware/upload");
const { verifyUser } = require("../middleware/verify");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream")
// var fs = require("fs")

const connection_url = process.env.DB_CONNECTION_URL;
const conn = mongoose.createConnection(connection_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let gfs, gridfsBucket;
conn.once('open', () => {
 gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
 bucketName: 'uploads'
});

 gfs = Grid(conn.db, mongoose.mongo);
 gfs.collection('uploads');
})


router.post("/", verifyUser, upload.array("image", 5), async (req, res) => {
  const newRecipe = {
    name: req.body.name,
    image: req.files[0].originalname,
    description: req.body.description,
    time: req.body.time,
    serves: req.body.serves,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    user: req.user._id,
  };

  recipe.create(newRecipe, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.put("/:id", verifyUser, upload.array("image", 5), function (req, res) {
  const newRecipe = {
    name: req.body.name,
    image: req.files[0] ? req.files[0].originalname : req.body.image,
    description: req.body.description,
    time: req.body.time,
    serves: req.body.serves,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    user: req.user._id,
  };

  recipe.findByIdAndUpdate(req.params.id, newRecipe, (err, updatedRecipe) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(updatedRecipe);
    }
  });
});

router.get("/", (req, res) => {
  recipe.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/search", (req, res) => {
  const { query } = req.query;
  recipe.find({ $text: { $search: query } }).exec((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/user/:id", verifyUser, (req, res) => {
  recipe.find({ user: req.params.id }).exec((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/:id", (req, res) => {
  recipe.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.delete("/:id", (req, res) => {
  recipe.remove({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).send({
                msg: 'No file exists'
            });
        }

        // Check if image
        console.log(file);
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gridfsBucket.openDownloadStream(file._id)
            readstream.pipe(res);
        } else {
            res.status(404).send({
                msg: 'Not an image'
            });
        }
    });
});
module.exports = router;
