import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('store', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

export async function connectDB () {
  await sequelize.sync();

  console.log('BD conectada'); 
}
