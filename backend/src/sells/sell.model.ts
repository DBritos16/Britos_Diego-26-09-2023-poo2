import { Sell } from './sell.entity'
import { sequelize } from '../database/database'
import { DataTypes, Model } from 'sequelize'

class SellModel extends Model<Sell> implements Sell {
    public declare id: number;
    public declare tipo: string;
    public declare cantidad: number;
    public declare fecha: string;
    public declare total: number;
    public declare productId: number;
}

SellModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleDateString(),
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'sells'
});


export { SellModel }
