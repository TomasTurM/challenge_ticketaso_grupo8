import { generateRandomEmail } from "../Utils"



const userData = {
  nombres: 'Juan Perez',
  apellido: 'Gomez',
  telefono: '1234567890',
  provincia: 'Buenos Aires',
  localidad: 'La Plata',
  fechaNacimiento: { dd: '23', mm: '06', aaaa: '1998' },
  email: generateRandomEmail(),
  password: 'Password123!',
  wrongLengthPassword: 'Test',
  wrongFormatPassword: 'Test32!'
}


export { userData }