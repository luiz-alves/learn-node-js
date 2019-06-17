const env = process.env.NODE_ENV || 'dev';

console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);

const config = () => {
    switch(env){
        case 'dev':
            return {
                bd_string: 'mongodb://localhost/security',
                jwt_pass: 'batatafrita2019',
                jwt_expires_in: '7d'
            }
        case 'hml':
            return {
                bd_string: 'mongodb://localhost/security',
                jwt_pass: 'batatafrita2019',
                jwt_expires_in: '7d'
            }
        case 'prd':
            return {
                bd_string: 'mongodb://localhost/security',
                jwt_pass: 'batatafrita2019',
                jwt_expires_in: '7d'
            }
    }
}

console.log(`Iniciano a API em ambiente ${env.toUpperCase()}`);

module.exports = config();