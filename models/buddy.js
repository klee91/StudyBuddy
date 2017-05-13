module.exports = function(sequelize, DataTypes) {
  var Buddy = sequelize.define("Buddy", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[1]
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[6]
      }
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true, 
        len: [5,10]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //area of study
    aos: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    study_subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });
  return Buddy;
};