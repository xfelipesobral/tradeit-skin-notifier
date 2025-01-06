import cron from 'node-cron'
import { tradeitFindItemsByGroupId } from './tradeit'

const checkedItemIdsList: string[] = [] // List of checked item IDs

cron.schedule('*/30 * * * *', async () => {
    console.log('🔍 Checking for new ★ Moto Gloves | Finish Line (Field-Tested)')

    const itens = await tradeitFindItemsByGroupId('329770') // Search for skin: ★ Moto Gloves | Finish Line (Field-Tested)

    itens.forEach((item) => {
        if (!checkedItemIdsList.find((id) => id === item.id)) {
            checkedItemIdsList.push(item.id)
        }
    })
})
