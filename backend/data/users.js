import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Swaraj Sonwane',
        email: 'swaraj@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'Tony Stark',
        email: 'tony@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
]

export default users;