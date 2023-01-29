const {LinValidator, Rule} = require('../../core/lin-validator-v2')

const {User} = require('../models/user')
const {LoginType, ArtType} = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator{
    constructor(){
        super() // To use 'this' in a subclass, have to call super()
        this.id = [
            new Rule('isInt', ' must be positive integer', {min:1})
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor(){
        super()
        this.email = [
            new Rule('isEmail','It is not an Email!')
        ]
        this.password1 = [
            new Rule('isLength', 'At least 6 characters and a maximum of 32 characters', {
                min:6,
                max:32
            }),
            new Rule('matches', 'The password is invalid.', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', 'The length of nickname should between 4 to 32 characters.', {
                min: 4,
                max: 32
            }),
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('Both passwords must be the same')
        }
    }

    async validateEmail(vals){
        const email = vals.body.email
        const user = await User.findOne({
            where:{
                email:email
            }
        })

        if(user){
            throw new Error('Email already exists!')
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        //hidden mistake
        // Java
        // JS Python 
        super()
        this.account = [
            new Rule('isLength', 'Does not comply with account rules', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            //    validator.js
            new Rule('isOptional'),
            new Rule('isLength', 'At least 6 characters', {
                min: 6,
                max: 128
            })
        ]

    }

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type is a required parameter')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('The type parameter is invalid')
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', 'Empty is not allowed', {
                min: 1
            })
        ]
    }
}

function checkType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type is a required parameter')
    }
    type = parseInt(type)

    if (!LoginType.isThisType(type)) {
        throw new Error('The type parameter is invalid')
    }
}

function checkArtType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type is a required parameter')
    }
    type = parseInt(type)

    if (!ArtType.isThisType(type)) {
        throw new Error('The type parameter is invalid')
    }
}

class Checker {
    constructor(type) {
        this.enumType = type
    }

    check(vals) {
        let type = vals.body.type || vals.path.type
        if (!type) {
            throw new Error('type is a required parameter')
        }
        type = parseInt(type)

        if (!this.enumType.isThisType(type)) {
            throw new Error('The type parameter is invalid')
        }

    }
}



class LikeValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        this.validateType = checkArtType
        // const checker = new Checker(ArtType)
        // this.validateType = checker.check.bind(checker)
    }
}

class ClassicValidator extends LikeValidator {

}

class SearchValidator extends LinValidator {
    constructor() {
        super()
        this.q = [
            new Rule('isLength', 'Search keywords cannot be empty', {
                min: 1,
                max: 16
            })
        ]
        this.start = [
            new Rule('isInt', 'Incompatible specification', {
                min: 0,
                max: 60000
            }),
            new Rule('isOptional', '', 0)
        ]
        this.count = [
            new Rule('isInt', 'Incompatible specification', {
                min: 1,
                max: 20
            }),
            new Rule('isOptional', '', 20)
        ]

    }
}

class AddShortCommentValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        this.content = [
            new Rule('isLength', 'Must be between 1 and 12 characters', {
                min: 1,
                max: 12
            })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    ClassicValidator,
    SearchValidator,
    AddShortCommentValidator
}