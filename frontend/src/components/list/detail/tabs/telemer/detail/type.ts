export interface members {
  parameters: Record<'user_id' | 'name' | 'email', { value: string }>;
  insured_id: string;
}
export interface QuestionConfig {
  question_text: string[];
  question_id: string;
  type: string;
  required: 1 | 0;
  option?: { capture_text: number; label: string; answer_id: string }[];
  sub_questions?: {
    answer_id: string;
    question_text: string[];
    question_id: string;
    type: string;
    required: number;
  };
  sub_question_mapping?: {
    string: string[];
  };
  answer?: {
    user_id: string;
    answer_id: string | string[];
    answer: string | string[];
  }[];
}

export interface TelemerQuestion {
  question_config: QuestionConfig;
  question_id: string;
  //   members: members;
}
export interface sectionType {
  section: string;
  questions: TelemerQuestion[];
  members: members[];
}
