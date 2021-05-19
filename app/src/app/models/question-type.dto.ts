


export enum QuestionType {
	SingleChoice = 'single_choice',
	MultipleChoice = 'multi_choice',
	FreeText = 'free_text'
}


export namespace QuestionType {

  export function fromString(str: string): QuestionType {
    switch (str) {
      case 'free_text':
        return QuestionType.FreeText;
      case 'single_choice':
        return QuestionType.SingleChoice;
      case 'multi_choice':
        return QuestionType.MultipleChoice;
      default:
        throw Error(`Cannot convert value ${str} to QuestionType`);
    }
  }

  export function questionTypeName(type: QuestionType): string {
    switch (type) {
      case QuestionType.FreeText:
        return 'Free text';
      case QuestionType.MultipleChoice:
        return 'Multiple choice';
      case QuestionType.SingleChoice:
        return 'Single choice';
    }
  }
}
