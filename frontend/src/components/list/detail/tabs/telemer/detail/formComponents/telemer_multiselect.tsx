import { useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { QuestionConfig } from '../type';
import { Control, Controller } from 'react-hook-form';

interface propsType {
  questionText: string[] | null;
  options: QuestionConfig['option'];

  control: Control;
  name: string;
  defaultValue: any;
  required?: boolean;
  readonly: boolean;
  handleAnswerChange: (question_id: string, value: any) => void;
  label: string;
}
const TelemerSelect: React.FC<propsType> = ({
  questionText,
  options,
  handleAnswerChange,
  control,
  name,
  required,
  label,
}) => {
  const getSelectValue = useMemo(() => {
    return (
      options
        // @ts-ignore
        ?.filter((option) => option.selected)
        .map((option) => option?.answer_id)
    );
  }, [options]);

  const handleOptionChange = (
    answer_id: string,
    value: string[],
    isSelected: boolean | string,
    callback: Function,
  ) => {
    // checked T:
    //            1. value not present in the answer list-> push it
    //            2. value present -> do nothing
    //         F:
    //            1. value not present -> do nothing
    //            2. value present -> delete it

    let result: string[] = [];
    if (isSelected && !value.includes(answer_id)) {
      result = [...value, ...[answer_id]];
    } else if (!isSelected && value.includes(answer_id)) {
      result = value.filter((item: string) => item !== answer_id);
    }
    handleAnswerChange(name, result);
    return callback(result);
  };

  return (
    <div className="p-4">
      <p className="font-bold font-italic text-gray-600">{label}</p>
      <div className="mb-6">
        {questionText && <p className="font-medium mb-4">{questionText}</p>}
        {/* <div className="flex items-center mb-4">
          <Checkbox id="no-one" checked={noOne} onCheckedChange={(checked) => handleNoOneChange(checked as boolean)} />
          <Label htmlFor="no-one" className="ml-2">
            No one
          </Label>
        </div> */}
        <Controller
          control={control}
          name={name}
          rules={{
            ...(required && {
              validate: {
                [name]: (val) => {
                  if (required && val?.length === 0) return 'Required';
                },
              },
            }),
          }}
          render={({
            field: { onChange, value = getSelectValue },
            fieldState: { error },
          }) => {
            // console.log('Error in checkbox', error);
            return (
              <div className=" pt-2">
                <div className="py-2 grid grid-cols-6 gap-2 border-b border-gray-100">
                  <div className="col-span-5 grid grid-cols-5 gap-2">
                    {options?.map((option, index) => {
                      return (
                        <div className="flex items-center" key={index}>
                          <Checkbox
                            id={`${index}-${option.answer_id}`}
                            checked={value.includes(option.answer_id)}
                            //   disabled={noOne}
                            onCheckedChange={(checked) => {
                              handleOptionChange(
                                option.answer_id,
                                value,
                                checked,
                                onChange,
                              );
                            }}
                          />
                          <Label
                            htmlFor={`${index}-${option.answer_id}`}
                            className="ml-2 text-sm"
                          >
                            {option.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
export default TelemerSelect;
