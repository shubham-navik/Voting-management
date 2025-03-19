const Admin = require('../models/admin');
const Voter = require('../models/voter')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// admin registration
exports.createAdmin = async (req, res) => {
    const { name, email, password   } = req.body;
    try {
        let admin = await Admin.findOne ({ email });
        if (admin) {
            return res.status(400).json({ msg: "Admin already exists with this email" });
        }   
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        admin = new Admin({
            name,
            email,
            password: hashPassword
            
        });
        await admin.save();
        res.send('Admin registered successfully');
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in registering');
    }
}

// admin login
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ msg: "Admin does not exist with this email: "+email });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }
        const payload = {//data to be sent in token
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'24h'});
        res.send({message:'Admin logged in successfully', admin, token});
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

//get  all voter list avalible in our country
exports.getAllVoter = async (req, res) => {
    try {

        const voters = await Voter.find({});

        res.status(200).json({
            msg: "All elegible Voters ",
            voters
        })
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg:"server error"
        })
    }
}



