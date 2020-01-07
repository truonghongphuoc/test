const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...'

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplidateNote = notes.find((note) => note.title === title)

    if (!duplidateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added')
    } else {
        console.log('Note title already exists')
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const noteIndex = notes.findIndex((note) => note.title === title)
    if (noteIndex !== -1) {
        notes.splice(noteIndex,1)
        saveNotes(notes)
        console.log(chalk.green.inverse(`Note removed.`))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length !== 0) {
        console.log(chalk.green('Your notes:'))
        notes.forEach((note) => console.log('- ' + note.title))
    } else {
        console.log(chalk.red('You have 0 notes'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.bold(note.title) + ' : ' + note.body)
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}