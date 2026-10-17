import { createContext, useContext, useState, useEffect } from "react";
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
    clearCart: () => void;
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
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            return JSON.parse(savedCart);
        }

        return [];
    });
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product) => {
        // setCartItems toma currentItems como el estado que tenia antes de ejecutar esta callback digamos.
        setCartItems(currentItems => {
            const existingItem = currentItems.find(
                item => item.product.id === product.id
            );
            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                    console.log("Error: No se puede agregar más productos, no hay suficiente stock");
                    return currentItems;
                }
                // si existe, retorname el mismo array pero con la cantidad incrementada de ese producto.
                return currentItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // si el product no existe, agregalo al final del array.
            return [
                ...currentItems, {
                    product,
                    quantity: 1
                }
            ];
        });
    };

    // Es parecida  addToCart, pero la diferencia esta en que trabaja con el id del product
    // ya agregado al carrito. 
    const increaseQuantity = (productId: number) => {
        setCartItems(currentItems =>
            currentItems.map(item => {
                // Aca trabaja con el item.product.id --> El item seria el {product, quantity} ya en el carrito.
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

    // filtra el carrito con los productos cuyo id sea distinto al parametro. 
    // Es decir, elimina el product de ese id.
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

    const clearCart = () => {
        setCartItems([]);
    }


    // reduce recorre un array y acumula un resultado a partir de sus elementos.
    const total = cartItems.reduce(
        (accumulator, item) => {
            return accumulator + (item.product.price * item.quantity);
        },
        0 // el 0 es el valor inicial del accumulator.
    );

    // Los valores que quiero compartir son los que se definen aca.
    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            clearCart,
            total
        }}>
            {children}
        </CartContext.Provider>
    );

}

// El provider es un componente que envuelve a otros componentes
// y les da acceso a un valor compartido (en este caso, el carrito)
// sin necesidad de pasar props manualmente.
// El value es la info que quiero compartir
export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe utilizarse dentro de CartProvider");
    }

    return context;
}
// hook personalizado: me da acceso al carrito en cualquier componente.