interface TradeitItem {
    id: string
    assetId: string
    classId: string
    steamId: string
    assetLength: number
    price: number
    priceForTrade: number
    sitePrice: number
    saleOfferOwner: number
    storePrice: number
    stablePrice: number
    botIndex: number
    floatValue: number
    paintIndex: number
    patternIndex: number
    defIndex: number
    stickerSlots: null
    metaMappings: {
        rarity: number
        type: number
        agent: boolean
    }[]
    gameId: string
    imgURL: string
    name: string
    phase: null
    colors: string[]
    urlSlug: string
    score: number
    wantedStock: number
    currentStock: number
    steamAppId: number
    steamContextId: number
    steamInspectLink: string
    steamMarketLink: string
    steamInventoryLink: string
    steamTags: string[]
    stickers: null
    charms: null
    createdAt: Date
    tradedAt: Date
    tradeLockDay: number | null
    groupId: number
    onlyStore: boolean
    storeBasePrice: number
    instantSellPrice: number
    _id: string
    tradeLockAt: number
}
