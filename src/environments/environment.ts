export const environment = {
    production: false,
    // baseUrl: 'http://localhost:3000' ,// local 
    baseUrl:'https://seashell-app-rslco.ondigitalocean.app', // deployed
    routes:{
        createUser:"/api/users/create",
        getUsersList:"/api/users/all",
        createRole:"/api/roles/create",
        getRolesList:"/api/roles/all",
        assignRolesToUsers:"/api/users/assign/role",
        swapMapping:"/api/users/swapMapping"
    }
  };