const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if(!(email && password)) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }
    // Retrieve the user from the MongoDB database
    const user = await Users.findOne({ email:email });
    
    if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }
    
    // Compare the password hash with the input password
    
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }
    
    // Generate a JWT token and return it to the client
    const token = jwt.sign({ email }, 'my-secret-key');
    res.send({ "token":token });
};
const register = async (req, res) => {
 try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
      return;
    }
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Users.findOne({ email:email });
    
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await Users.insertOne({
      first_name:first_name,
      last_name:last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      "my-secret-key"
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}

module.exports = {login, register};