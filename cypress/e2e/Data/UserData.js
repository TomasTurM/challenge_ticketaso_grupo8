import { generateRandomDNI, generateRandomEmail } from "../Utils"



const userData = {
  nombres: 'Juan Perez',
  apellido: 'Gomez',
  telefono: '1234567890',
  provincia: 'Buenos Aires',
  localidad: 'La Plata',
  fechaNacimiento: { dd: '23', mm: '06', aaaa: '1998' },
  email: generateRandomEmail(),
  password: 'Password123!',
  password2Correct: 'Password123!',
  password2Wrong: 'Password321!',
  wrongLengthPassword: 'Test',
  wrongFormatPassword: 'Test32!'
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


const userDataWithWrongFormatDni = {
    dni: 'ABCD1234',
    password: userData.password, 
    password2: userData.password2Correct
}


export { userData, userDataWithCorrectPassword, userDataWithWrongPassword,userDataWithEmptyDNI,userDataWithRepeatEmail,userDataWithWrongFormatDni }