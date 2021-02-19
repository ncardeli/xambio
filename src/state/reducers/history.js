const INITIAL_STATE = [
	{
		id: "1",
		timestamp: new Date().getTime(),
		exchangeRate: 42.5,
		local: 42500,
		dollars: 1000,
		match: {
			name: "Juan Perez",
			email: "jperez@aa.aa.com",
			phone: "099212474",
			receivingAccount: "5882543",
			receivingAccountBank: "Itaú",
			depositAccount: "8182773",
			depositAccountBank: "Itaú",
		},
		type: "sell",
		status: "completed",
	},
	{
		id: "2",
		timestamp: new Date().getTime(),
		exchangeRate: 42.5,
		local: 42500,
		dollars: 1000,
		match: {
			name: "Juan Perez",
			email: "jperez@aa.aa.com",
			phone: "099212474",
			receivingAccount: "5882543",
			receivingAccountBank: "Itaú",
			depositAccount: "8182773",
			depositAccountBank: "Itaú",
		},
		type: "buy",
		status: "completed",
	},
	{
		id: "3",
		timestamp: new Date().getTime(),
		exchangeRate: 42.5,
		local: 42500,
		dollars: 1000,
		match: {
			name: "Juan Perez",
			email: "jperez@aa.aa.com",
			phone: "099212474",
			receivingAccount: "5882543",
			receivingAccountBank: "Itaú",
			depositAccount: "8182773",
			depositAccountBank: "Itaú",
		},
		type: "sell",
		status: "aborted",
	},
];

function historyReducer(state = INITIAL_STATE, action) {
	return state;
}

export default historyReducer;
