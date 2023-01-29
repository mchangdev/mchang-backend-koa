const {Sequelize,Model} = require('sequelize')
const {unset, clone, isArray} = require('lodash')

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

// To connect to a database, must create a Sequelize instance.
const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql', // have to install mysql2 in advance, see in package.json
    host,
    port,
    logging:true, // show original sql in command line when operating database
    timezone: '-05:00',
    define:{
        //create_time update_time delete_time
        timestamps:true, // if false, will not generate create_time and update_time
        paranoid:true, // control delete_time
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        freezeTableName:true,
        scopes:{
            bh:{
                attributes:{
                    exclude:['updated_at','deleted_at','created_at']
                }
            }
        }
    }
})

// sync() can create table into database depend on models
sequelize.sync({
    /*
     NOTE: Remember to set as false, then need to manually drop table
    */
    force:false // (true) sequelize can automatically delete the table, then create a new one
})

module.exports = {
    sequelize
}