export function validateManagerRegistrationRequest(input: any) {
    const sanitizedInput = {
        firstName: input.firstName?.trim(),
        lastName: input.lastName?.trim(),
        e_mail: input.e_mail?.trim().toLowerCase(),
        password: input.password?.trim()
    };

    if (!sanitizedInput.firstName) {
        throw new Error("First name is required");
    }

    if (!sanitizedInput.lastName) {
        throw new Error("Last name is required");
    }

    if (!sanitizedInput.e_mail) {
        throw new Error("Email is required");
    }

    if (!sanitizedInput.password) {
        throw new Error("Password is required");
    }

    if (sanitizedInput.password.length < 6) {
        throw new Error(
            "Password must be at least 6 characters long"
        );
    }

    return sanitizedInput;
}