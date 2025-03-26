import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuestionConfig } from '../type';
import { Control, Controller } from 'react-hook-form';
import { useMemo } from 'react';

interface propsType {
  questionText: string[] | null;
  options: QuestionConfig['option'];
  question_id: string;
  handleAnswerChange: (name: string, value: string | string[]) => void;
  control: Control;
  name: string;
  label: string;
  required: boolean;
  defaultValue: any;
}

const TelemerRadio: React.FC<propsType> = ({
  questionText,
  options,
  question_id,
  handleAnswerChange,
  control,
  name,
  label,
  required,
  defaultValue,
}) => {
  const getValue = useMemo(
    () =>
      options?.find((o) => o.answer_id === 'default_value')?.answer_id ?? '',
    [options],
  );
  return (
    <div className="mb-6 flex gap-4">
      <p className="font-bold font-italic text-gray-600">{label}</p>
      <Controller
        control={control}
        name={name}
        rules={{
          ...(required && {
            validate: {
              [name]: (val) => {
                if (required && !val) return 'Required';
              },
            },
          }),
        }}
        render={({
          field: { onChange, value = defaultValue },
          fieldState: { error },
        }) => {
          const handleOnChange = (value: string) => {
            onChange(value);
            // handleMemberForm(e);
            // options?.forEach((option) => {
            //   option.selected = option.answer_id === e.target.value;
            // });
            handleAnswerChange(name, value);
          };
          return (
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // className="space-y-2"
              defaultValue={value}
              // value={getValue}
              onValueChange={handleOnChange}
              className="flex space-x-4"
            >
              {options?.map((option, index) => (
                <div
                  className="flex inline-flex  items-center space-x-2"
                  key={index}
                >
                  <RadioGroupItem
                    value={option.answer_id}
                    id={question_id + '_' + index}
                  />
                  <Label htmlFor={question_id + '_' + index}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          );
        }}
      ></Controller>
    </div>
  );
};

export default TelemerRadio;
