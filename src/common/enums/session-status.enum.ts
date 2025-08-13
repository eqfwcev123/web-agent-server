export enum SessionStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  ABANDONED = 'abandoned',
}

export enum SessionProgressStep {
  PROBLEM_ANALYSIS = 'problem_analysis',
  APPROACH_EXPLANATION = 'approach_explanation',
  CODE_WRITING = 'code_writing',
  CODE_REVIEW = 'code_review',
  OPTIMIZATION = 'optimization',
  TESTING = 'testing',
  COMPLETED = 'completed',
}

export enum AIInteractionType {
  EXPLANATION = 'explanation',
  HINT = 'hint',
  CODE_ANALYSIS = 'code_analysis',
  DEBUGGING_HELP = 'debugging_help',
  OPTIMIZATION_SUGGESTION = 'optimization_suggestion',
  CONCEPTUAL_QUESTION = 'conceptual_question',
}

export enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING_WRITING = 'reading_writing',
}
