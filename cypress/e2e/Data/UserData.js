import { generateRandomDNI,generateRandomWrongDNI, generateRandomEmail } from "../Utils"



const userData = {
  nombres: 'Juan Perez',
  apellido: 'Gomez',
  telefono: '1234567890',
  telefonoIncorrecto: '12345abc',
  provincia: 'Buenos Aires',
  localidad: 'La Plata',
  fechaNacimiento: { dd: 23, mm: 11, aaaa: 1998 },
  dni: generateRandomDNI(),
  email: generateRandomEmail(),
  password: 'Password123!',
  password2Correct: 'Password123!',
  password2Wrong: 'Password321!',
  wrongLengthPassword: 'Test',
  wrongFormatPassword: 'TestPassword'
}


const userDataWithCorrectPassword = {
    dni: generateRandomDNI(),
    password: userData.password, 
    password2: userData.password2Correct
}

const userDataWithWrongPassword = {
    dni: generateRandomDNI(),
    password: userData.password, 
    password2: userData.password2Wrong
}


const userDataWithEmptyDNI = {
    dni: ' ',
    password: userData.password, 
    password2: userData.password2Correct
}


const userDataWithRepeatEmail = {
    email : "test@gmail.com",
    dni: generateRandomDNI(),
    password: userData.password, 
    password2: userData.password2Correct
}

const userDataWithDiferentEmail = {
     emailConfirm : "nadaquever@gmail.com",
}


const userDataWithRepeatedDni = {
    dni: 12345678,
    password: userData.password, 
    password2: userData.password2Correct
}

const userDataWithWrongAge = {
     fechaNacimiento: { dd: 12, mm: 12, aaaa: 2022 },
}


const userDataWithShortPassword = {
    password: userData.wrongLengthPassword,
    password2: userData.wrongLengthPassword
}

const userDataWithWrongFormatPassword = {
    password: userData.wrongFormatPassword,
    password2: userData.wrongFormatPassword
}


const userDataWithWrongLengthDni = {
    dni: generateRandomWrongDNI(),
}

const userDataWithWrongFormatPhone = {
    telefono: userData.telefonoIncorrecto,
}

const userDataWithWrongLengthPhone = {
    telefono: '112233445566',
}  



const userDataWithWrongFormatDni = {
    dni: 'ABCD1234',
    password: userData.password, 
    password2: userData.password2Correct
}


export { userData, userDataWithCorrectPassword, userDataWithWrongPassword,userDataWithEmptyDNI,userDataWithRepeatEmail,userDataWithDiferentEmail,
    userDataWithRepeatedDni,userDataWithWrongAge,userDataWithShortPassword,
    userDataWithWrongFormatPassword,userDataWithWrongLengthDni,userDataWithWrongFormatPhone,userDataWithWrongLengthPhone,userDataWithWrongFormatDni }