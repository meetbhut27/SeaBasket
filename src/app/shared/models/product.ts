export interface Product {
    id: string,
    name: string,
    price: number,
    category?: string,
    description: string,
    imageUrl: string,
    avgRating: number,
    productDetail?: {
        id: number,
        ASIN: string,
        brand: string,
        itemWeight: number,
        sellerRank: number
        manufacturer: string
    },
    reviews?: [
        {
            review: string,
            image: string,
            rating: {
                rating: number,
                user: {
                    name: string
                }
            }
        }
    ]
}
