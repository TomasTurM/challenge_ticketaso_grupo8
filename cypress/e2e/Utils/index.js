


function generateRandomDNI() {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}

function generateRandomWrongDNI() {
  return Math.floor(1000000000 + Math.random() * 90000000).toString()
}

function generateRandomEmail() {
  return `testTicketazo${Math.floor(Math.random() * 100000)}@gmail.com`
}


export { generateRandomDNI,generateRandomWrongDNI, generateRandomEmail }