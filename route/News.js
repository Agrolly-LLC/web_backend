const express = require('express')
const router = express.Router()
const { News } = require('../models')

router.get('/', async (req, res) => {
    try {
        const news = await News.findAll({ order: [['id', 'DESC']] })
        return res.json(news)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong on get news, " + err })
    }
})

router.get('/search', async (req, res) => {

    var location = req.query.location
    var contentsearch = req.query.search


    try {
        const news = await News.findAll({
            where:{
                location: location == undefined ? { [Op.ne]: 'undefined' } : { [Op.like]: `%${location}%` },
                content: contentsearch == undefined ? { [Op.ne]: 'undefined' } : { [Op.like]: `%${contentsearch}%` }
            }
        })
        return res.json(news)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong on search news, " + err })
    }
})


router.post("/", (req, res) => {

    const {title, content, location, image, reference, date_happen} = req.body
    

    if (!title) {
      res.status(400);
      res.json({
        error: "the news require a title",
      });
    }
   
    var happendDate = new Date(date_happen)
  
    News.create({ title, content, location, image, reference, date_happen:happendDate })
      .then((news) => {
        return res.json({ status: news.title + " is created" });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Something went wrong from adding the news " + err })
      });
  });



  router.get("/:id", function (req, res, next) {
    News.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((news) => {
        if (news) {
           res.json(news);
        } else {
            res.status(500).json({error: "news dose not exits"});
        }
      })
      .catch((err) => {
        res.json({
            error: "news create error",
          });
      });
  });

  module.exports = router;