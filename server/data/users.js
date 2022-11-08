const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'samuel Osei Adu',
        email: 'samuelosei@gmail.com',
        password: bcrypt.hashSync('qwertyui', 15),
        isAdmin: true,
    },
    {
        name: 'Anthony Peprah',
        email: 'anthonypep@gmail.com',
        password: bcrypt.hashSync('qwertyui', 15),
    },
    {
        name: 'Nsiah Douglas',
        email: 'nsiahdg@gmail.com',
        password: bcrypt.hashSync('qwertyui', 15)
    },
    {
        name: 'Kesse Emmanuel',
        email: 'emmak@gmail.com',
        password: bcrypt.hashSync('qwertyui', 15)
    },
    {
        name: 'Owusu Williams',
        email: 'wills@gmail.com',
        password: bcrypt.hashSync('qwertyui', 15)
    }

]

module.exports = users