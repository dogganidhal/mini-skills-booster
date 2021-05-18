

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
			'answers.question',
			'answers.suggestions',
			'answers.question.suggestions',
			'quiz',
			'quiz.author',
			'quiz.questions',
			'quiz.questions.suggestions'
		],
		StudentReport: [
			'answers',
			'answers.suggestions'
		]
	},
	Suggestion: {
		None: [],
		All: [
			'question',

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
			'submissions.answers.suggestions',
		],
		ExceptSubmissions: [
			'author',
			'questions',
			'questions.suggestions'
		]
	}
};
