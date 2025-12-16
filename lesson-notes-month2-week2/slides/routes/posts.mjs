import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    res.send({
        firstname: "Divine",
        lastname: "Ezinwanne",
        surname: "Ajaegbu",
        age: 40,
        ['marital-status']: "single",
        state: "Anambra State",
        occupation: "Software engineer"
    })
})


router.post("/:id", (req, res) => {
    res.send(`PostId: ${req.params.id}`)
})

export default router;