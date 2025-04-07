import React, { useEffect } from 'react';
import Textarea from '@/components/ui/textarea';
import { Control, Controller } from 'react-hook-form';
import ErrorComponent from './errorComponent';

interface TelemerTextareaProps {
  heading: string;
  placeholder?: string;
  value: string;
  control: Control;
  name: string;
  label: string[];
  defaultValue: any;
  required?: boolean;
  type: string;
  readonly: boolean;
  message?: string;
  answer_id: any;
  handleAnswerChange: (question_id: string, value: any) => void;
}

const TelemerTextarea: React.FC<TelemerTextareaProps> = ({
  label,
  placeholder,
  value,
  control,
  name,
  required,
  defaultValue,
  readonly,
  handleAnswerChange,
}) => {
  useEffect(() => {}, []);
  const debounce = (callback: Function) => {
    var debounceId: any = null;
    return (name: string, value: string) => {
      clearTimeout(debounceId);
      debounceId = setTimeout(() => {
        callback(name, value);
      }, 500);
    };
  };
  const updateChanges = debounce(handleAnswerChange);
  return (
    <div className="flex flex-col space-y-2 p-1">
      <p className="font-bold font-italic text-gray-600">{label}</p>
      {/* <div className="font-semibold text-base">{label}</div> */}
      <Controller
        control={control}
        name={name}
        // rules={{
        //   ...(required && {
        //     required: !defaultValue && `${label} is required`,
        //   }),
        // }}
        render={({
          field: { onChange, value = defaultValue },
          fieldState: { error },
        }) => {
          // const handleOnChange: React.ChangeEventHandler<
          //   HTMLTextAreaElement
          // > = (e) => {
          //   onChange(e);
          //   // handleAnswerChange(name, e.target.value);
          // };

          return (
            <div>
              <Textarea
                disabled={readonly}
                // placeholder={placeholder}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  updateChanges(name, e.target.value);
                }}
                className="p-2 border rounded-md "
                style={{
                  backgroundColor: '#F8F9FAFF',
                  borderColor: '#BCC1CAFF',
                }}
              />
              <ErrorComponent
                errorMessage={error?.message}
                isVisible={Boolean(error)}
              />
            </div>
          );
        }}
      ></Controller>
    </div>
  );
};

export default TelemerTextarea;
