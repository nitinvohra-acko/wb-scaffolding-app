export interface member {
  user_id: string;
  name: string;
}

export interface QuestionConfig {
  question_text: string[];
  question_id: string;
  type: string;
  required: number;
  option?: { capture_text: string; label: string; answer_id: string }[];
  sub_questions?: QuestionsType[];
  sub_question_mapping?: { [key: string]: string[] };
  answer?: {
    [key: string]: { answer_id: string | string[]; answer: string | string[] };
  };
}

export interface TelemerQuestion {
  question_config: QuestionConfig;
  question_id: string;
  //   members: members;
}
export interface sectionType {
  section: string;
  questions: TelemerQuestion[];
  members: member[];
}

export interface QuestionsType {
  section: string;
  question_config: QuestionConfig;
  eligible_members: member[];
  question_id: string;
}
