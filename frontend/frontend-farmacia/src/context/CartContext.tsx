import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/product.ts";

interface CartItem {
    product: Product;
    quantity: number;
}// Esto representa un producto dentro del carrito.

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    total: number
}

interface CartProviderProps {
    children: ReactNode; // ReactNode: Represents all of the things React can render.
}

// children es una propiedad especial de React que representa
// todos los componentes hijos que se renderizan dentro del provider.
// Todo lo que esté envuelto por el provider tendrá acceso a cartItems.

export const CartContext = createContext<CartContextType | undefined>(undefined);
//Context: distintos componentes pueden modificar el mismo estado compartido sin pasarse props entre ellos.
//Es una manera de evitar el "prop drilling", que es cuando tenes que pasar props a través de muchos niveles de componentes.
export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCartItems(currentItems => {
            const existingItem = currentItems.find(
                item => item.product.id === product.id
            );
            if (existingItem) {
                return currentItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...currentItems, {
                    product,
                    quantity: 1
                }
            ];
        });
    };

    const increaseQuantity = (productId: number) => {
        setCartItems(currentItems =>
            currentItems.map(item => {
                if (item.product.id !== productId) {
                    return item;
                }
                if (item.quantity >= item.product.stock) {
                    console.log("Error: No se puede agregar más productos, no hay suficiente stock");
                    return item;
                }
                return { ...item, quantity: item.quantity + 1 };
            })
        );
    };

    const removeFromCart = (productId: number) => {
        setCartItems(currentItems =>
            currentItems.filter(item => item.product.id !== productId)
        );
    };
    const decreaseQuantity = (productId: number) => {
        setCartItems(currentItems =>
            currentItems.map(item => {
                if (item.product.id !== productId) {
                    return item;
                }
                if (item.quantity <= 1) {
                    return item;
                }
                return { ...item, quantity: item.quantity - 1 };
            })
        );
    };


    const total = cartItems.reduce(
        (accumulator, item) => {
            return accumulator + (item.product.price * item.quantity);
        },
        0 // el 0 es el valor inicial del accumulator.
    );
    // reduce va recorriendo todos los productos y acumulando un resultado.

    console.log(cartItems);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, total }}>
            {children}
        </CartContext.Provider>
    );

}
export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe utilizarse dentro de CartProvider");
    }

    return context;
}
// El provider es un componente que envuelve a otros componentes
// y les da acceso a un valor compartido (en este caso, el carrito)
// sin necesidad de pasar props manualmente.
// El value es la info que quiero compartir