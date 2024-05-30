export const RESOURCES: { [resourceName : string] : {[action : string] : string} } = {
    'user' : {
        'sign_in' : '/api/user/sign_in',
        'sign_up' : '/api/user/sign_up',
        'show' : '/user/profile',
        'update' : '/user/profile'
    },
    'employee' : {
        'sign-in' : '/employee/sign-in'
    },
    'customer' : {
        'sign-in' : '/customer/sign-in'
    }
}