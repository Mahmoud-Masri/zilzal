import generateUniqueId from "./generateUniqueId"

if (!localStorage.getItem('token')) {
    const token = generateUniqueId({ size: 'long' })
    localStorage.setItem('token', token)
}

export const token = localStorage.getItem('token')!


