export interface Sale {
    id: number;
    paymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER';
    deliveryMethod: 'PICKUP' | 'DELIVERY';
    customer: number;
    manager: number;
    totalAmount: number;
    date: Date;
    paidDate?: Date;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

export interface SaleCreateInput {
    paymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER';
    deliveryMethod: 'PICKUP' | 'DELIVERY';
    customer: number;
    manager: number;
}

export interface SaleUpdateInput {
    paymentMethod?: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER';
    deliveryMethod?: 'PICKUP' | 'DELIVERY';
}

export interface SaleItemInput {
    product: number;
    quantity: number;
}


export interface SaleItem {
    id: number;
    product: number;
    quantity: number;
}