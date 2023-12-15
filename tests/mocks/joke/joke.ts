import { Joke } from "../../../src/models/joke";

export const jokeMock: Joke = {
    error: false,
    category: "Misc",
    type: "twopart",
    setup: "Que dit-on à quelqu'un de triste qui joue aux jeux vidéos?",
    delivery: "On dit qu'il se console!",
    flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false
    },
    safe: true,
    id: 150,
    lang: "fr"
}
