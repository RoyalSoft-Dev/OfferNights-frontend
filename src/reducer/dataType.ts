export interface StateType {
    auth: {
        token: string | null;
        isAuthenticated: boolean;
        loading: boolean;
        user: null;
    }
    error: {
        errors: null
    }
};

export interface UserType {
    _id: string,
    type: string,
    firstName: string,
    middleName: string,
    lastName: string,
    avatar: string,
    cell: string,
    email: string,
    tradeName: string,
    brokerageName: string,
    brokerageAddress: string,
    brokerageCity: string,
    brokeragePostalCode: string,
    brokeragePhone: string,
    pictures: []
};

