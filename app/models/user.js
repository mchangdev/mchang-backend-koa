const bcrypt = require('bcryptjs')

const {sequelize} = require('../../core/db')

const{Sequelize, Model} = require('sequelize')

class User extends Model{
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.AuthFailed('Account does not exist')
        }
        // user.password === plainPassword
        const correct = bcrypt.compareSync(
            plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('Incorrect password')
        }
        return user
    }

    static async getUserByOpenid(openid){
        const user = await User.findOne({
            where:{
                openid
            }
        })
        return user
    }

    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    email:{
        type:Sequelize.STRING(128),
        unique:true
    },
    password:{
        type: Sequelize.STRING,
        set(val){
            const salt = bcrypt.genSaltSync(10)
            /*
            * Prevent Rainbow Attacks
            * Encryption, even if the passwords of different users are the same, 
            * they are different after encryption
            */
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue('password', psw)
        }
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize, // a instance of Sequelize
    tableName: 'user'
})

module.exports = {
    User
}