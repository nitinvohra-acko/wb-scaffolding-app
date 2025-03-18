export type Option = {
  option_id: string;
  answer_id: string;
  label: string[];
  selected?: boolean;
  capture_text: boolean;
  text?: string;
};

export interface QUESTION {
  questionId: String;
  question: string[];
  answer: string;
  read_only?: boolean;
}

export type Question = {
  question_id: string;
  question_text: string[];
  question: string[];
  required: boolean;
  type:
    | 'telemer_textarea'
    | 'telemer_multi_select'
    | 'telemer_radio_group'
    | 'telemer_info'
    | 'telemer_additional_question'
    | 'members_comments';
  option?: Option[];
  sub_question_mapping?: Record<string, string[]>;
  sub_questions?: Question[];
  value?: string | string[] | QUESTION[];
  read_only?: boolean;
  answer?: string | string[];
  answer_id: string;
};

export const formInitState: any = (
  arr: Question[],
  initalVal: Record<string, any> = {},
  callback?: (curr: any) => void,
) => {
  let newArr = arr.reduce((acc, curr) => {
    if (curr?.question_id === 'member_comments' && callback) {
      acc[curr?.question_id] = callback(curr);
      return acc;
    } else {
      acc[curr?.question_id] = curr.value
        ? curr.value
        : ['telemer_multi_select', 'members_comments'].includes(curr.type)
        ? []
        : '';
      if (curr?.sub_questions && curr?.sub_questions?.length > 0) {
        return formInitState(curr.sub_questions, acc);
      }
      return acc;
    }
  }, initalVal as Record<string, any>);
  console.log('new array', newArr);
  return newArr;
};
