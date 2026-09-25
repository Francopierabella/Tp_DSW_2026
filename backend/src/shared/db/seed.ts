import bcrypt from "bcrypt";
import { orm } from "./orm.js";
import { ProductCategory } from "../../productCategory/productCategory.entity.js";
import { Product } from "../../product/product.entity.js";
import { HealthInsurance } from "../../healthInsurance/healthInsurance.entity.js";
import { Customer } from "../../customer/customer.entity.js";

//DATOS DE PRUEBA PARA ARRANCAR LA BD

export async function seedDatabase(): Promise<void> {
    const em = orm.em.fork();

    // =========================================================
    // 1. HEALTH INSURANCES
    // =========================================================

    const healthInsuranceData = [
        {
            name: "IAPOS",
            coveragePercentage: 40
        },
        {
            name: "OSDE",
            coveragePercentage: 50
        },
        {
            name: "Swiss Medical",
            coveragePercentage: 60
        },
        {
            name: "Galeno",
            coveragePercentage: 45
        }
    ];

    const healthInsurances: Record<string, HealthInsurance> = {};

    for (const data of healthInsuranceData) {

        let healthInsurance = await em.findOne(
            HealthInsurance,
            { name: data.name }
        );

        if (!healthInsurance) {
            healthInsurance = new HealthInsurance(
                data.name,
                data.coveragePercentage
            );

            await em.persistAndFlush(healthInsurance);

            console.log(`Health insurance created: ${data.name}`);
        }

        healthInsurances[data.name] = healthInsurance;
    }


    // =========================================================
    // 2. CUSTOMERS
    // =========================================================

    const password = await bcrypt.hash("123456", 10);

    const customerData = [
        {
            firstName: "Franco",
            lastName: "Pierabella",
            dni: "40111222",
            phoneNumber: "3415551001",
            address: "San Martín 123",
            e_mail: "franco@example.com",
            healthInsurance: "IAPOS"
        },
        {
            firstName: "Juan",
            lastName: "Gómez",
            dni: "40222333",
            phoneNumber: "3415551002",
            address: "Belgrano 456",
            e_mail: "juan@example.com",
            healthInsurance: "OSDE"
        },
        {
            firstName: "María",
            lastName: "López",
            dni: "40333444",
            phoneNumber: "3415551003",
            address: "Mitre 789",
            e_mail: "maria@example.com",
            healthInsurance: "Swiss Medical"
        },
        {
            firstName: "Sofía",
            lastName: "Martínez",
            dni: "40444555",
            phoneNumber: "3415551004",
            address: "Rivadavia 321",
            e_mail: "sofia@example.com",
            healthInsurance: "Galeno"
        },
        {
            firstName: "Pedro",
            lastName: "Rodríguez",
            dni: "40555666",
            phoneNumber: "3415551005",
            address: "España 654",
            e_mail: "pedro@example.com",
            healthInsurance: undefined
        }
    ];

    for (const data of customerData) {

        const existingCustomer = await em.findOne(
            Customer,
            { e_mail: data.e_mail }
        );

        if (!existingCustomer) {

            const customer = new Customer(
                data.firstName,
                data.lastName,
                data.dni,
                data.phoneNumber,
                data.address,
                data.e_mail,
                password,
                data.healthInsurance
                    ? healthInsurances[data.healthInsurance].id!
                    : undefined
            );

            await em.persistAndFlush(customer);

            console.log(`Customer created: ${data.firstName} ${data.lastName}`);
        }
    }


    // =========================================================
    // 3. PRODUCT CATEGORIES
    // =========================================================

    const categoryData = [
        "Medicamentos",
        "Higiene y cuidado personal",
        "Perfumería",
        "Bebés",
        "Vitaminas y suplementos"
    ];

    const categories: Record<string, ProductCategory> = {};

    for (const name of categoryData) {

        let category = await em.findOne(
            ProductCategory,
            { name }
        );

        if (!category) {

            category = new ProductCategory(name);

            await em.persistAndFlush(category);

            console.log(`Category created: ${name}`);
        }

        categories[name] = category;
    }


    // =========================================================
    // 4. PRODUCTS
    // =========================================================

    const productData = [
        {
            name: "Paracetamol 500",
            description: "Analgésico y antifebril de uso habitual.",
            brand: "Genfar",
            gender: "unisex",
            price: 2500,
            stock: 50,
            category: "Medicamentos",
            isFeatured: true
        },
        {
            name: "Ibuprofeno 400",
            description: "Analgésico y antiinflamatorio.",
            brand: "Ibupirac",
            gender: "unisex",
            price: 3200,
            stock: 40,
            category: "Medicamentos",
            isFeatured: true
        },
        {
            name: "Aspirina 500",
            description: "Analgésico para dolores leves y moderados.",
            brand: "Bayer",
            gender: "unisex",
            price: 2800,
            stock: 35,
            category: "Medicamentos",
            isFeatured: false
        },
        {
            name: "Shampoo Nutritivo",
            description: "Shampoo para cabello seco y dañado.",
            brand: "Pantene",
            gender: "female",
            price: 4500,
            stock: 25,
            category: "Higiene y cuidado personal",
            isFeatured: true
        },
        {
            name: "Jabón Líquido",
            description: "Jabón líquido para higiene diaria.",
            brand: "Dove",
            gender: "unisex",
            price: 2900,
            stock: 30,
            category: "Higiene y cuidado personal",
            isFeatured: false
        },
        {
            name: "Crema Hidratante",
            description: "Crema hidratante para uso diario.",
            brand: "Nivea",
            gender: "unisex",
            price: 5200,
            stock: 20,
            category: "Higiene y cuidado personal",
            isFeatured: true
        },
        {
            name: "Perfume Blue",
            description: "Fragancia fresca de uso diario.",
            brand: "Antonio Banderas",
            gender: "male",
            price: 12500,
            stock: 15,
            category: "Perfumería",
            isFeatured: true
        },
        {
            name: "Perfume Floral",
            description: "Fragancia floral femenina.",
            brand: "Natura",
            gender: "female",
            price: 13500,
            stock: 12,
            category: "Perfumería",
            isFeatured: false
        },
        {
            name: "Pañales Talle M",
            description: "Pañales descartables para bebés.",
            brand: "Huggies",
            gender: "unisex",
            price: 8500,
            stock: 18,
            category: "Bebés",
            isFeatured: false
        },
        {
            name: "Vitamina C",
            description: "Suplemento de vitamina C.",
            brand: "Redoxon",
            gender: "unisex",
            price: 6500,
            stock: 25,
            category: "Vitaminas y suplementos",
            isFeatured: true
        }
    ];

    for (const data of productData) {

        const existingProduct = await em.findOne(
            Product,
            { name: data.name }
        );

        if (!existingProduct) {

            const category = categories[data.category];

            const product = new Product(
                data.name,
                data.description,
                data.brand,
                data.gender,
                data.price,
                data.stock,
                category.id!,
                data.isFeatured
            );

            await em.persistAndFlush(product);

            console.log(`Product created: ${data.name}`);
        }
    }
}