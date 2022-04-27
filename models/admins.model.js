module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword: {
                attributes: { include: ['password'] },
            }
        }
    });

    return Admin;
};
