const username = [
    "jessicaDay",
    "nickMiller",
    "schmidt",
    "winstonBishop",
    "ceceParkh",
    "coach"
];

const email = [
    "jessday@gmail.com",
    "nickmiller@aol.com",
    "schmidty@gmail.com",
    "winstonthebish@yahoo.com",
    "ceceparkh@gmail.com",
    "coach@hotmail.com"
];

const text = [
    "I’m not convinced I know how to read, I’ve just memorized a lot of words.",
    "I brake for birds. I rock a lot of polka dots.",
    "Sometimes I think I'm just a riddle that I can't even solve.",
    "You were denied a cell phone because you have the credit score of a homeless ghost.",
    "You gave me cookie I got you cookie, man.",
    "TLook at that font! What is this? Amateur hour? At least use Palatino."
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () => `${getRandom(username)}`

const getRandomEmail = () => `${getRandom(email)}`

const getRandomText = () => `${getRandom(text)}`

module.exports = { getRandomName, getRandomEmail, getRandomText }