<<<<<<< HEAD
const Database = require('../database/config')

module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password

        let roomId = ''
        let isRoom = true

        while (isRoom) {
            for (let i = 0; i < 6; i++) {
                roomId += Math.floor(Math.random() * 10).toString()
            }

            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

            if (!isRoom) {
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${Number(roomId)},
                    "${pass}"
                )`)
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(
            `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
        )
        const questionsRead = await db.all(
            `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
        )
        let isNoQuestions

        if (questions.length === 0) {
            if (questionsRead.length === 0) {
                isNoQuestions = true
            }
        }

        res.render('room', { roomId, questions, questionsRead, isNoQuestions })
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    },
}
=======
const Database = require('../database/config')

module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password

        let roomId = ''
        let isRoom = true

        while (isRoom) {
            for (let i = 0; i < 6; i++) {
                roomId += Math.floor(Math.random() * 10).toString()
            }

            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

            if (!isRoom) {
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${Number(roomId)},
                    "${pass}"
                )`)
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(
            `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
        )
        const questionsRead = await db.all(
            `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
        )
        let isNoQuestions

        if (questions.length === 0) {
            if (questionsRead.length === 0) {
                isNoQuestions = true
            }
        }

        res.render('room', { roomId, questions, questionsRead, isNoQuestions })
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    },
}
>>>>>>> b83758e74df287c14007443e70c1a368ae59d90a
