define(['models/model', 'models/transaction', 'lodash'], function(Model, Transaction, _) {
	var Tag = new Model('tags');

	Tag.queryName = function(v){
		return Tag.query().map(function(t){
			return t.name;
		});
	};

	Tag.refresh = function(v) {
		var transactions = Transaction.query();
		var tags = _.chain(transactions)
			.map(function(t) {
				return t.tags.split(',').map(_.trim);
			})
			.flatten()
			.uniq()
			.map(function(t) {
				return Tag.create({
					name: t
				});
			})
			.value();
		Tag.dump(tags);
	};

	return Tag;
});
