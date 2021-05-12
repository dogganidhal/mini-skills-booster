

export const ModelIncludes = {
	User: {
		None: []
	},
	RefreshToken: {
		None: [],
		All: ['user']
	},
	Question: {
		None: [],
		All: [
			'quiz',
			'suggestions'
		]
	},
	Submission: {
		None: [],
		All: [
			'user',
			'answers',
			'answers.suggestion'
		]
	},
	Quiz: {
		None: [],
		All: [
			'author',
			'questions',
			'questions.suggestions',
			'submissions',
			'submissions.user',
			'submissions.answers',
			'submissions.answers.suggestion',
		]
	}
};
