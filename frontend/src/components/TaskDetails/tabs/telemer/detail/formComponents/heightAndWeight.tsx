import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import ErrorComponent from './errorComponent';

interface TelemerTextareaProps {
  heading: string;
  placeholder?: string;
  value: string[];
  control: Control;
  name: string;
  label: string[];
  defaultValue: any;
  required?: boolean;
  type: string;
  readonly: boolean;
  message?: string;
  answer_id: any;
  handleAnswerChange: (question_id: string[], value: any) => void;
}

const HeightAndWeight: React.FC<TelemerTextareaProps> = ({
  label,
  placeholder,
  value,
  control,
  name,
  required,
  defaultValue = ['', ''],
  readonly,
  handleAnswerChange,
}) => {
  //  rule
  // value.lenth = 2 always
  // value[0]: name
  // value[1]: DOB
  const [changedHeight, setChangedHeight] = useState(defaultValue[0]);
  const [changedWeight, setChangedWeight] = useState(defaultValue[1]);

  useEffect(() => {
    if (
      defaultValue &&
      Array.isArray(defaultValue) &&
      defaultValue.length === 2
    )
      setChangedWeight(defaultValue[1]);
    setChangedHeight(defaultValue[0]);
  }, [defaultValue]);

  const debounce = (callback: Function) => {
    var debounceId: any = null;
    return (name: string, value: string[]) => {
      clearTimeout(debounceId);
      debounceId = setTimeout(() => {
        callback(name, value);
      }, 500);
    };
  };
  const updateChanges = debounce(handleAnswerChange);

  return (
    <div className="flex flex-col space-y-2 p-1">
      <Controller
        control={control}
        name={name}
        // rules={{
        //   ...(required && {
        //     required: !defaultValue && `${label} is required`,
        //   }),
        // }}
        render={({
          field: { onChange, value = [changedHeight, changedWeight] },
          fieldState: { error },
        }) => {
          return (
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="font-semibold mb-2">{label}</p>
              <div className="flex items-center mb-3">
                <div className="w-20 text-gray-600">Height</div>
                <div className="flex gap-2">
                  <div className="flex">
                    <Input
                      className="w-16 h-8 rounded-r-none"
                      placeholder=""
                      id={name + '_height'}
                      disabled={readonly}
                      value={changedHeight ?? ''}
                      onChange={(e) => {
                        setChangedHeight(e.target.value);
                        if (value && Array.isArray(value)) {
                          onChange([e.target.value, value[1]]);
                          updateChanges(name, [e.target.value, value[1]]);
                        } else {
                          console.log('in else of height', value);
                        }
                      }}
                    />

                    <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
                      cm
                    </div>
                  </div>
                  <div className="flex">
                    {(() => {
                      const heightInCm = parseFloat(changedHeight);
                      if (!isNaN(heightInCm)) {
                        const totalInches = heightInCm / 2.54;
                        const feet = Math.floor(totalInches / 12);
                        const inches = Math.round(totalInches % 12);
                        return `${feet} ft ${inches} in`;
                      }
                      return 'Invalid height';
                    })()}
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="w-20 text-gray-600">Weight</div>
                <div className="flex">
                  <Input
                    className="w-16 h-8 rounded-r-none"
                    id={name + '_weight'}
                    placeholder=""
                    disabled={readonly}
                    value={changedWeight ?? ''}
                    onChange={(e) => {
                      setChangedWeight(e.target.value);
                      if (value && Array.isArray(value)) {
                        onChange([value[0], e.target.value]);
                        updateChanges(name, [value[0], e.target.value]);
                      }
                    }}
                  />
                  <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
                    in kgs
                  </div>
                </div>
              </div>

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

export default HeightAndWeight;

{
  /* <div className="bg-gray-50 p-4 rounded-md mb-4">


<p className="my-4">Please tell me your height & weight:</p>

<div className="bg-gray-100 p-4 rounded-md">
  <div className="flex items-center mb-3">
    <div className="w-20 text-gray-600">Height</div>
    <div className="flex gap-2">
      <div className="flex">
        <Input
          className="w-16 h-8 rounded-r-none"
          placeholder=""
        />
        <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
          ft
        </div>
      </div>
      <div className="flex">
        <Input
          className="w-16 h-8 rounded-r-none"
          placeholder=""
        />
        <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
          in
        </div>
      </div>
      <Button
        variant="default"
        size="sm"
        className="h-8 bg-gray-800 text-white text-xs"
      >
        ft/in
      </Button>
      <Button variant="outline" size="sm" className="h-8 text-xs">
        cm
      </Button>
    </div>
  </div>

  <div className="flex items-center mb-3">
    <div className="w-20 text-gray-600">Weight</div>
    <div className="flex">
      <Input className="w-16 h-8 rounded-r-none" placeholder="" />
      <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
        in kgs
      </div>
    </div>
  </div>

  <div className="flex items-center">
    <div className="w-20 text-gray-600">BMI</div>
    <div>NA</div>
  </div>
</div>
</div> */
}
