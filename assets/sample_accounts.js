
const bcrypt = require('bcrypt');

const accounts =
	[
		{
			firstName: 'Alex',
      lastName: 'Read',
			email: 'alexread730@gmail.com',
			password: bcrypt.hashSync('Password123', 8),
      phone: '4147588814',
			deckId: '',
			lastText: '',
			responded: false,
			resCount: 0
		},
		{
      firstName: 'Ross',
      lastName: 'Kiser',
			email: 'rosskiser@gmail.com',
			password: bcrypt.hashSync('Password123', 8),
      phone: '6176949664',
			deckId: '',
			lastText: '',
			responded: false,
			resCount: 0
		}
	];


module.exports = accounts;
