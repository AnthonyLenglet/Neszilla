const getRange = (rom, start, amount) => rom.slice(start, amount)

const toBinary = hex => parseInt(hex, 16).toString(2)

export { getRange, toBinary }
