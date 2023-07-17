export interface Order {
    "id": number,
    "userId": number,
    "orderDate": string,
    "shipedTo": string,
    "products": [
        {
            "id": number,
            "name": string,
            "price": number,
            "imageUrl": string,
            "quantity": number
        }
    ]
}
