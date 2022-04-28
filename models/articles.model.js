module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            unique: true,
        },
        summary: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.TEXT,
        },
        image: {
            type: Sequelize.STRING,
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return Article;
};
