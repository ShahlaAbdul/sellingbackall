import express from 'express';
import mongoose, { Schema } from 'mongoose';
import cors from "cors";
const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

const sellingSchema = new Schema({
    image: String,
    name: String,
    description: String,
});

const SellingModel = mongoose.model('Selling', sellingSchema);
app.get('/', async (req, res) => {
    try {
        const selling = await SellingModel.find({})
        res.send(selling)
    } catch (error) {
        res.send(error.message)

    }
})

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const selling = await SellingModel.findById(id)
        res.send(selling)
    } catch (error) {
        res.send(error.message)

    }
})

app.post('/', async (req, res) => {
    try {
        const { image, name, description } = req.body
        const newSelling = new SellingModel({ image, name, description })
        await newSelling.save()
        res.send(newSelling)
    } catch (error) {
        res.send(error.message)

    }
})

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { image, name, description } = req.body
        const newSelling = await SellingModel.findByIdAndUpdate(id, { image, name, description })
        res.send(newSelling)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const newSelling = await SellingModel.findByIdAndDelete(id )
        res.send(newSelling)
    } catch (error) {
        res.send(error.message)
    }
})

mongoose
    .connect('mongodb+srv://Shahla:sehla200415@mycluster.vpdzf3b.mongodb.net/')
    .then(() => console.log("connected"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})