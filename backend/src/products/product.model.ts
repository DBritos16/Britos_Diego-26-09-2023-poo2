import { Product } from './product.entity'
import { sequelize } from '../database/database'
import { DataTypes, Model } from 'sequelize'
import { SellModel } from '../sells/sell.model'

class ProductModel extends Model<Product> implements Product {
    public declare id: number
    public declare nombre: string
    public declare marca: string
    public declare precio: number
    public declare stock: number
}

ProductModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'products'
});

ProductModel.hasMany(SellModel,{
    foreignKey: 'productId',
    onDelete: 'CASCADE'
});

SellModel.belongsTo(ProductModel,{
    foreignKey: 'productId'
});

export { ProductModel }
