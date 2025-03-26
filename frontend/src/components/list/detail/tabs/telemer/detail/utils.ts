import { QuestionsType, member } from './type';
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
      // console.log('sub question>>', curr);
      if (curr?.sub_questions && curr?.sub_questions?.length > 0) {
        return formInitState(curr.sub_questions, acc);
      }
      return acc;
    }
  }, initalVal as Record<string, any>);
  // console.log('new array', newArr);
  return newArr;
};

export function getUniqueMembers(data: QuestionsType[]) {
  const uniqueMembers = new Map();
  data.forEach((item) => {
    if (item.eligible_members) {
      item.eligible_members.forEach((member) => {
        uniqueMembers.set(member.user_id, member.name.toLowerCase());
      });
    }
  });
  return Array.from(uniqueMembers, ([user_id, name]) => ({ user_id, name }));
}

export const updateObjectByKey = (
  arr: QuestionsType[] | undefined,
  key: keyof QuestionsType['question_config'],
  keyValue: string,
  value: string | string[],
  user_id: string,
  captured_text_value?: string | null,
) => {
  if (!arr) return arr;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]['question_config'][key] === keyValue) {
      if (Boolean(captured_text_value)) {
        const _option = arr[i].question_config.option;
        if (arr[i]?.question_config.option?.length !== 0) {
          _option?.map((option) => {
            if (option.answer_id === value) {
              option.capture_text = captured_text_value ?? '';
            }
            return option;
          });
        }
        // _option future use
        arr[i] = {
          ...arr[i],
          question_config: {
            ...arr[i].question_config,
            answer: { [user_id]: { answer: value, answer_id: value } },
          },
        };
      } else {
        if (keyValue === 'member_comments') {
          arr[i] = { ...arr[i] }; // modifiy this later
        } else {
          arr[i] = {
            ...arr[i],
            question_config: {
              ...arr[i].question_config,
              answer: arr[i].question_config.answer
                ? {
                    ...arr[i].question_config.answer,
                    [user_id]: { answer: value, answer_id: value },
                  }
                : { [user_id]: { answer: value, answer_id: value } },
            },
          };
        }
      }
      break;
    }
    if (
      arr[i]?.question_config.sub_questions &&
      Array.isArray(arr[i].question_config.sub_questions)
    ) {
      updateObjectByKey(
        arr[i].question_config.sub_questions,
        key,
        keyValue,
        value,
        user_id,
      );
    }
  }
  return arr;
};
