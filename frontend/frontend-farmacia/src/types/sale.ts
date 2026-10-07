export interface Sale {
    id: number;
    paymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER';
    deliveryMethod: 'PICKUP' | 'DELIVERY';
    customer: number;
    totalAmount: number;
    date: Date;
    paidDate?: Date;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

export interface SaleResponse {
    id: number;
    paymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER';
    deliveryMethod: 'PICKUP' | 'DELIVERY';
    customer: {
        id: number;
        firstName: string;
        lastName: string;
    };
    totalAmount: number;
    date: Date;
    paidDate?: Date;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

export interface SaleCreateInput {
    paymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER';
    deliveryMethod: 'PICKUP' | 'DELIVERY';
    customer: number;
}

export interface SaleUpdateInput {
    paymentMethod?: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER';
    deliveryMethod?: 'PICKUP' | 'DELIVERY';
}
