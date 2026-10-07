import bcrypt from "bcrypt";
import { orm } from "./orm.js";
import { ProductCategory } from "../../productCategory/productCategory.entity.js";
import { Product } from "../../product/product.entity.js";
import { HealthInsurance } from "../../healthInsurance/healthInsurance.entity.js";
import { Customer } from "../../customer/customer.entity.js";
import { Manager } from "../../manager/manager.entity.js";
import { SupplierProduct } from "../../supplierProduct/supplierProduct.entity.js";
import { Supplier } from "../../supplier/supplier.entity.js";

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
    // Manager
    // =========================================================

    const managerEmail = "admin@farmacia.com";

    const existingManager = await em.findOne(Manager, {
        e_mail: managerEmail
    });

    if (!existingManager) {

        const hashedPassword = await bcrypt.hash("123456", 10);

        const manager = new Manager(
            "Administrador",
            "Farmacia",
            managerEmail,
            hashedPassword
        );

        await em.persistAndFlush(manager);

        console.log("Manager created");
    }

    // =========================================================
    // 2. CUSTOMERS
    // =========================================================

    const password = await bcrypt.hash("123456", 10);

    const customerData = [
        {
            firstName: "Franco",
            lastName: "Pierabella",
            dni: "45504061",
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
        "Higiene",
        "Perfumería",
        "Bebés",
        "Vitaminas"
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
            isFeatured: true,
            hasHealthInsuranceCoverage: true
        },
        {
            name: "Ibuprofeno 400",
            description: "Analgésico y antiinflamatorio.",
            brand: "Ibupirac",
            gender: "unisex",
            price: 3200,
            stock: 40,
            category: "Medicamentos",
            isFeatured: true,
            hasHealthInsuranceCoverage: false

        },
        {
            name: "Aspirina 500",
            description: "Analgésico para dolores leves y moderados.",
            brand: "Bayer",
            gender: "unisex",
            price: 2800,
            stock: 35,
            category: "Medicamentos",
            isFeatured: false,
            hasHealthInsuranceCoverage: true
        },
        {
            name: "Shampoo Nutritivo",
            description: "Shampoo para cabello seco y dañado.",
            brand: "Pantene",
            gender: "female",
            price: 4500,
            stock: 25,
            category: "Higiene",
            isFeatured: true,
            hasHealthInsuranceCoverage: false
        },
        {
            name: "Jabón Líquido",
            description: "Jabón líquido para higiene diaria.",
            brand: "Dove",
            gender: "unisex",
            price: 2900,
            stock: 30,
            category: "Higiene",
            isFeatured: false,
            hasHealthInsuranceCoverage: false
        },
        {
            name: "Crema Hidratante",
            description: "Crema hidratante para uso diario.",
            brand: "Nivea",
            gender: "unisex",
            price: 5200,
            stock: 20,
            category: "Higiene",
            isFeatured: true,
            hasHealthInsuranceCoverage: false
        },
        {
            name: "Perfume Blue",
            description: "Fragancia fresca de uso diario.",
            brand: "Antonio Banderas",
            gender: "male",
            price: 12500,
            stock: 15,
            category: "Perfumería",
            isFeatured: true,
            hasHealthInsuranceCoverage: true
        },
        {
            name: "Perfume Floral",
            description: "Fragancia floral femenina.",
            brand: "Natura",
            gender: "female",
            price: 13500,
            stock: 12,
            category: "Perfumería",
            isFeatured: false,
            hasHealthInsuranceCoverage: true
        },
        {
            name: "Pañales Talle M",
            description: "Pañales descartables para bebés.",
            brand: "Huggies",
            gender: "unisex",
            price: 8500,
            stock: 18,
            category: "Bebés",
            isFeatured: false,
            hasHealthInsuranceCoverage: false
        },
        {
            name: "Vitamina C",
            description: "Suplemento de vitamina C.",
            brand: "Redoxon",
            gender: "unisex",
            price: 6500,
            stock: 25,
            category: "Vitaminas",
            isFeatured: true,
            hasHealthInsuranceCoverage: true
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
                data.isFeatured,
                data.hasHealthInsuranceCoverage
            );

            await em.persistAndFlush(product);

            console.log(`Product created: ${data.name}`);
        }
    }
    // =========================================================
    // 6. Suppliers 
    //

    const suppliers = [
        {
            name: "Bayer",
            email: "bayer@gmail.com",
            phoneNumber: "1132334455"
        },
        {
            name: "Genfar",
            email: "genfar@gmail.com",
            phoneNumber: "1122334466"
        },
        {
            name: "Andrómaco",
            email: "andromaco@gmail.com",
            phoneNumber: "1122334477"
        },
        {
            name: "Pfizer",
            email: "pfizer@gmail.com",
            phoneNumber: "1122334488"
        },
        {
            name: "Roemmers",
            email: "roemmers@gmail.com",
            phoneNumber: "1122334499"
        },
        {
            name: "Sanofi",
            email: "sanofi@gmail.com",
            phoneNumber: "1122334400"
        },
        {
            name: "Merck",
            email: "merck@gmail.com",
            phoneNumber: "1122334435"
        },
        {
            name: "Novartis",
            email: "novartis@gmail.com",
            phoneNumber: "1122334425"
        },
        {
            name: "Roche",
            email: "roche@gmail.com",
            phoneNumber: "1122334415"
        },
        {
            name: "Gador",
            email: "gador@gmail.com",
            phoneNumber: "1722334455"
        }
    ]
    for (const data of suppliers) {
        const existingSupplier = await em.findOne(Supplier, { name: data.name });
        if (!existingSupplier) {
            const supplier = new Supplier(data.name, data.email, data.phoneNumber);
            await em.persistAndFlush(supplier);
            console.log(`Supplier created: ${data.name}`);
        }
    }

    // =========================================================
    // 7. Supplier Products
    // =========================================================
    const supplierProductData = [
        // Paracetamol 500
        { product: "Paracetamol 500", supplier: "Genfar", price: 1500 },
        { product: "Paracetamol 500", supplier: "Roemmers", price: 1580 },
        { product: "Paracetamol 500", supplier: "Sanofi", price: 1620 },

        // Ibuprofeno 400
        { product: "Ibuprofeno 400", supplier: "Genfar", price: 1950 },
        { product: "Ibuprofeno 400", supplier: "Roemmers", price: 2050 },
        { product: "Ibuprofeno 400", supplier: "Bayer", price: 2100 },

        // Aspirina 500
        { product: "Aspirina 500", supplier: "Bayer", price: 1650 },
        { product: "Aspirina 500", supplier: "Sanofi", price: 1720 },
        { product: "Aspirina 500", supplier: "Roemmers", price: 1800 },

        // Shampoo Nutritivo
        { product: "Shampoo Nutritivo", supplier: "Gador", price: 2800 },
        { product: "Shampoo Nutritivo", supplier: "Andrómaco", price: 2950 },
        { product: "Shampoo Nutritivo", supplier: "Merck", price: 3100 },

        // Jabón Líquido
        { product: "Jabón Líquido", supplier: "Gador", price: 1600 },
        { product: "Jabón Líquido", supplier: "Sanofi", price: 1700 },
        { product: "Jabón Líquido", supplier: "Merck", price: 1780 },

        // Crema Hidratante
        { product: "Crema Hidratante", supplier: "Andrómaco", price: 3000 },
        { product: "Crema Hidratante", supplier: "Roche", price: 3150 },
        { product: "Crema Hidratante", supplier: "Novartis", price: 3300 },

        // Perfume Blue
        { product: "Perfume Blue", supplier: "Gador", price: 7500 },
        { product: "Perfume Blue", supplier: "Novartis", price: 7800 },
        { product: "Perfume Blue", supplier: "Roche", price: 8100 },

        // Perfume Floral
        { product: "Perfume Floral", supplier: "Gador", price: 8000 },
        { product: "Perfume Floral", supplier: "Roche", price: 8250 },
        { product: "Perfume Floral", supplier: "Novartis", price: 8500 },

        // Pañales Talle M
        { product: "Pañales Talle M", supplier: "Bayer", price: 5000 },
        { product: "Pañales Talle M", supplier: "Sanofi", price: 5200 },
        { product: "Pañales Talle M", supplier: "Genfar", price: 5350 },

        // Vitamina C
        { product: "Vitamina C", supplier: "Bayer", price: 3800 },
        { product: "Vitamina C", supplier: "Roche", price: 4000 },
        { product: "Vitamina C", supplier: "Sanofi", price: 4100 },
        { product: "Vitamina C", supplier: "Merck", price: 4250 }
    ];
    for (const data of supplierProductData) {

        const product = await em.findOne(
            Product,
            { name: data.product }
        );

        const supplier = await em.findOne(
            Supplier,
            { name: data.supplier }
        );

        if (!product || !supplier) {
            console.log(
                `Could not create SupplierProduct: ${data.product} - ${data.supplier}`
            );
            continue;
        }

        const existingSupplierProduct = await em.findOne(
            SupplierProduct,
            {
                product: product.id!,
                supplier: supplier.id!
            }
        );

        if (!existingSupplierProduct) {

            const supplierProduct = new SupplierProduct(
                product.id!,
                supplier.id!,
                data.price
            );

            await em.persistAndFlush(supplierProduct);
        }
    }

}