import { surpriseMePrompts } from "../constants/index";
import FileSaver from "file-saver";
// ---- Random Prompt

export function getRandomPrompt(prompt) {

    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)

    const randomPrompt = surpriseMePrompts[randomIndex]

    if (randomPrompt === prompt) return getRandomPrompt(prompt)

    return randomPrompt
}

// ---- Download Image
export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}