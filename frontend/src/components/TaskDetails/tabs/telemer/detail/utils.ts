import { QuestionsType, member } from './type';
import * as z from 'zod';
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
  subQuestions?: Question[];
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
        : [
            'telemer_multi_select',
            'members_comments',
            'telemer_name_dob',
            'telemer_height_weight',
          ].includes(curr.type)
        ? []
        : '';
      // console.log('sub question>>', curr);
      if (curr?.subQuestions && curr?.subQuestions?.length > 0) {
        return formInitState(curr.subQuestions, acc);
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
      arr[i]?.question_config.subQuestions &&
      Array.isArray(arr[i].question_config.subQuestions)
    ) {
      updateObjectByKey(
        arr[i].question_config.subQuestions,
        key,
        keyValue,
        value,
        user_id,
      );
    }
  }
  return arr;
};

export const requestMapping = (questions: QuestionsType[]) => {
  let response: any = [];
  function iterativeQuestionMapping(questionConfigs: QuestionsType) {
    if (questionConfigs.question_config.answer) {
      let answers: { user_id: string; answer: string | string[] }[] = [];
      Object.keys(questionConfigs.question_config.answer).map((user_id) => {
        questionConfigs.question_config.answer &&
          answers.push({
            user_id: user_id,
            ...questionConfigs.question_config.answer[user_id],
          });
      });
      response.push({
        question_id: questionConfigs.question_config.question_id,
        question: questionConfigs.question_config.question_text,
        answer: answers,
        answer_id: answers,
        section: questionConfigs.section,
      });
    }
    questionConfigs.question_config.answer &&
      questionConfigs.question_config?.subQuestions?.map((sub_question) => {
        iterativeQuestionMapping(sub_question);
      });
  }

  questions.forEach((question) => {
    iterativeQuestionMapping(question);
  });
  return response;
};

export function questionSchema(
  config: QuestionsType,
  zodExpression: Record<string, z.ZodTypeAny>,
) {
  if (config.question_config.required === 1) {
    let zExpression: z.ZodTypeAny; // Explicitly define the type as a Zod schema
    switch (config.question_config.type) {
      case 'telemer_radio_group': {
        zExpression = z.string().min(1, 'Please select your option');
        break;
      }
      case 'telemer_multi_select': {
        zExpression = z.array(z.string()).min(1, 'This field is required.');
        break;
      }
      case 'telemer_textarea': {
        zExpression = z.string().min(1, 'This field is required.');
        break;
      }
      case 'telemer_height_weight': {
        zExpression = z
          .array(z.string())
          .min(2, 'Height and weight are required.');
        break;
      }
      case 'telemer_name_dob': {
        zExpression = z.array(z.string()).min(2, 'Name and DOB are required.');
        break;
      }
      default: {
        zExpression = z.string().min(1, 'This field is required.');
      }
    }
    zodExpression[config.question_config.question_id] = zExpression; // Add the schema to the object
  }

  // Recursively handle sub-questions
  if (config.question_config.subQuestions) {
    config.question_config.subQuestions.forEach((sub) => {
      questionSchema(sub, zodExpression);
    });
  }
}

export function getUniquSection(questions: QuestionsType[]): string[] {
  const sectionSet = new Set();
  questions.forEach((question) => {
    sectionSet.add(question.section);
  });
  return Array.from(sectionSet) as string[];
}

export function getQuestionById(
  questions: QuestionsType[],
  requireId: string,
): QuestionsType | null {
  let found: QuestionsType | null = null;
  function search(question: QuestionsType) {
    if (question.question_config.question_id === requireId) {
      found = question;
      return;
    }
    if (question.question_config.subQuestions) {
      question.question_config.subQuestions.forEach((question) => {
        search(question);
        if (found) return;
      });
    }
  }
  for (let question of questions) {
    search(question);
    if (found) break;
  }
  return found;
}
