define(['models/model'], function(Model) {
	var Transaction = new Model('transactions');
	Transaction.normalize = function(obj) {
		if(obj.amount){
			obj.amount = Number(obj.amount);
		}
		return obj;
	};
	return Transaction;
});
