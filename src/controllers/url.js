const validUrl = require("valid-url")
const shortId = require("shortid")
const Url = require("../models/Url")

exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body
  const baseUrl = process.env.BASE_URL
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json({ message: "URL base inválido" })
  }
  const urlCode = shortId.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl })
      if (url) {
        res.status(201).json({ data: url })
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date().toISOString().slice(0, 10)
        });
        await url.save();
        res.status(201).json({ data: url })
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ocorreu algum erro" })
    }
  } else {
    res.status(400).json({ message: "URL longo inválido" })
  }
}

exports.getById = async (req, res) => {
  try {
    let data = await Url.findById(req.params.id)
    if (data) {
      res.status(200).json({ data: data })
    } else {
      res.status(404).json({ message: "id não encontrada" })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu algum erro" })
  }
}

exports.getByDate = async (req, res) => {
  if (!req.query.date) {
    return res.status(400).json({ message: "você precisa consultar uma data específica" })
  }
  try {
    let data = await Url.find({ date: req.query.date })
    if (data.length > 0) {
      res.status(200).json({ data: data })
    } else {
      res.status(404).json({ message: "Dados não encontrados" })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu algum erro" })
  }
}

exports.redirect = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code })
    if (url) {
      return res.redirect(url.longUrl)
    } else {
      return res.status(404).json({ message: " URL não encontrada" })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu algum erro" })
  }
}