import cron from 'node-cron'
import { Telegraf } from 'telegraf'

import 'dotenv/config'

import { tradeitFindItemsByGroupId } from './tradeit'

// Checa se as variaveis ambientes estao configuradas
if (!process.env.TEL_API_TOKEN || !process.env.TEL_ID_RECEIVER) {
    throw new Error('🔴 Erro: .env não configurado corretamente')
}

const telBotApiToken = process.env.TEL_API_TOKEN
const telIdReceiver = process.env.TEL_ID_RECEIVER

// Inicia o bot do telegram
const bot = new Telegraf(telBotApiToken)

// Guarda em um array a lista dos ids que ja foram checados
const checkedItemIdsList: string[] = []

// Manda mensagem quando iniciar o script
console.log('🟢 Script iniciado')
bot.telegram.sendMessage(telIdReceiver, '🟢 Script iniciado')

// Busca os itens no tradeit e manda mensagem para o telegram
async function findItems(groupId: string) {
    console.log('🔄 Checando novos itens...')

    // Busca pela skin referente ao groupId do tradeit
    const itens = await tradeitFindItemsByGroupId(groupId)

    const newItens: TradeitItem[] = []

    // Checa se tem algum item novo
    itens.forEach((item) => {
        if (!checkedItemIdsList.find((id) => id === item.id)) {
            checkedItemIdsList.push(item.id)
            newItens.push(item)
        }
    })

    // Se tiver algum item novo, manda mensagem
    if (newItens.length > 0) {
        console.log('🟢 Novos itens encontrados, enviando mensagem para o telegram...')

        bot.telegram.sendPhoto(telIdReceiver, newItens[0].imgURL, {
            caption: `<b>${newItens[0].name}</b>\n\n${newItens
                .map((item) => `$${(item.priceForTrade / 100).toFixed(2)} - f ${item.floatValue.toFixed(3)}`)
                .join('\n')}`,
            parse_mode: 'HTML',
        })
    }
}

// Tarefa que sera executada pelo cron
async function task() {
    await findItems('329770') // ★ Moto Gloves | Finish Line (Field-Tested)
    await findItems('329519') // ★ Specialist Gloves | Lt. Commander (Field-Tested)
}

// Executa a tarefa pela primeira vez
task()

// A cada 30 minutos checa se tem um novo item no tradeit
cron.schedule('*/30 * * * *', task)
