const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const userController={
    getUserById: async(req,res)=>{
          try {
            // Chờ kết quả từ findByPk
            const user = await Users.findByPk(req.params.id);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    updateUser:async(req,res)=>{
        try {
            const { id } = req.params;
            const { name, phone, oldPass, newPass } = req.body;
    
            // Find the user based on id
            const user = await Users.findByPk(id);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Verify old password if newPass is provided
            if (newPass) {
                const validPass = await bcrypt.compare(oldPass, user.password);
                if (!validPass) {
                    return res.status(400).json({ message: 'Old password is incorrect' });
                }
    
                // Hash the new password
                const hashedPassword = await bcrypt.hash(newPass, 10);
                
                // Update user with new details
                await user.update({ name, phone, password: hashedPassword });
            } else {
                // Update user without changing the password
                await user.update({ name, phone });
            }
    
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports=userController