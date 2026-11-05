import { Request, Response, NextFunction } from "express";

export const sanitizedProductHealthInsuranceInput = (req: Request, res: Response, next: NextFunction) => {
    const { product, healthInsurance, coveragePercentage } = req.body;

    const parsedProduct = Number(product);
    if (!product || isNaN(parsedProduct) || parsedProduct <= 0) {
        return res.status(400).send({
            message: "Product ID is required and must be a positive number"
        });
    }

    const parsedHealthInsurance = Number(healthInsurance);
    if (!healthInsurance || isNaN(parsedHealthInsurance) || parsedHealthInsurance <= 0) {
        return res.status(400).send({
            message: "Health Insurance ID is required and must be a positive number"
        });
    }

    const parsedCoverage = Number(coveragePercentage);
    if (
        coveragePercentage === undefined ||
        coveragePercentage === null ||
        isNaN(parsedCoverage) ||
        parsedCoverage < 0 ||
        parsedCoverage > 100
    ) {
        return res.status(400).send({
            message: "Coverage Percentage is required and must be a number between 0 and 100"
        });
    }

    req.body.sanitizedProductHealthInsuranceInput = {
        product: parsedProduct,
        healthInsurance: parsedHealthInsurance,
        coveragePercentage: parsedCoverage
    };

    next();
};

export const sanitizedProductHealthInsuranceUpdateInput = (req: Request, res: Response, next: NextFunction) => {
    const { coveragePercentage } = req.body;
    const parsedCoverage = Number(coveragePercentage);

    if (
        coveragePercentage === undefined ||
        coveragePercentage === null ||
        isNaN(parsedCoverage) ||
        parsedCoverage < 0 ||
        parsedCoverage > 100
    ) {
        return res.status(400).send({
            message: "Coverage Percentage is required and must be a number between 0 and 100"
        });
    }
    req.body.sanitizedProductHealthInsuranceUpdateInput = {
        coveragePercentage: parsedCoverage
    };

    next();
};