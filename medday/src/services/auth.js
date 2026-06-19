export const login = (email, senha) => {

    if (
        email === "admin@medday.com" &&
        senha === "123456"
    ) {

        localStorage.setItem("auth", "true");

        return true;
    }

    return false;

};

export const logout = () => {

    localStorage.removeItem("auth");

};

export const isAuthenticated = () => {

    return localStorage.getItem("auth") === "true";

}