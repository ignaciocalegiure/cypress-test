export interface fakerData {
    fullName: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    registeredAt: string,
    streetAddress: string,
    anotherAddress: string,
    age: string,
    salary: string,
    department: string
}

export interface BSUser{
    username: string,
    password: string,
    books: [
        {
            title: string,
            author: string,
            publisher: string
        }
    ],
    userBooks: [
        {
            title: string,
            author: string,
            publisher: string
        }
    ] 
}