const bcrypt = require('bcryptjs');
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const passDecode = bcrypt.compareSync(password, users[i].password)
        if (users[i].username === username && passDecode) {
          console.log(users[i]);
          let userToReturn = {...users[i]}
          delete userToReturn.password;
          console.log(userToReturn);
          res.status(200).send(userToReturn);
          return;
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const { username, email, firstName, lastName, password } = req.body;
        const salt = bcrypt.genSaltSync(5);
        const passwordHash = bcrypt.hashSync(password, salt)
        console.log(passwordHash);

      let userObj = {
        username, 
        email, 
        firstName, 
        lastName, 
        password: passwordHash
      }

        users.push(userObj);
        let userToReturn = {...userObj}
        delete userToReturn.password;
        console.log(userToReturn);
        res.status(200).send(userToReturn);
    }
}