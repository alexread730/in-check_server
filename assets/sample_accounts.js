
const bcrypt = require('bcrypt');

const accounts =
	[
		{
			firstName: 'Alex',
      lastName: 'Read',
			email: 'alexread730@gmail.com',
			password: bcrypt.hashSync('Password123', 8),
      phone: '4147588814'
		},
		{
      firstName: 'Ross',
      lastName: 'Kiser',
			email: 'rosskiser@gmail.com',
			password: bcrypt.hashSync('Password123', 8),
      phone: '6176949664'
		}
	];


module.exports = accounts;
