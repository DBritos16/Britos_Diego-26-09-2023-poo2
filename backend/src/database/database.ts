import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('store', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

export async function connectDB () {
  await sequelize.sync({force: true})

  console.log('BD conectada'); 
}
