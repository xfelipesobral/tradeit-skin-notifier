import axios from 'axios'

export function tradeitApi() {
    return axios.create({
        baseURL: 'https://tradeit.gg/api/v2/inventory/data',
        params: {
            gameId: 730,
            offset: 0,
            limit: 100,
            searchValue: '',
            sortType: 'Popularity',
            minFloat: 0,
            maxFloat: 1,
            showTradeLock: true,
            onlyTradeLock: false,
            colors: '',
            showUserListing: true,
            stickerName: '',
            fresh: true,
            groupId: '',
            isForStore: 0,
        },
    })
}

export async function tradeitFindItemsByGroupId(groupId: string): Promise<TradeitItem[]> {
    try {
        const request = await tradeitApi().get<{ items: TradeitItem[] }>('', {
            params: {
                groupId,
            },
        })

        return request.data.items
    } catch {
        console.error('🔴 Erro ao buscar itens no tradeit')
        return []
    }
}
