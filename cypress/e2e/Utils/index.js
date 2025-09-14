


function generateRandomDNI() {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}

function generateRandomEmail() {
  return `test${Math.floor(Math.random() * 100000)}@gmail.com`
}


export { generateRandomDNI, generateRandomEmail }