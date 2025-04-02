import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Edit, Save } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
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

const NameAndDob: React.FC<TelemerTextareaProps> = ({
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
  //  rule
  // value.lenth = 2 always
  // value[0]: name
  // value[1]: DOB
  const [openNameEdit, setOpenNameEdit] = useState(false);
  const [openDOBEdit, setOpenDOBEdit] = useState(false);
  const [changedName, setChangedName] = useState(defaultValue[0]);
  const [changedDoB, setChangedDOB] = useState(defaultValue[1]);
  useEffect(() => {
    if (
      defaultValue &&
      Array.isArray(defaultValue) &&
      defaultValue.length === 2
    )
      setChangedDOB(defaultValue[1]);
    setChangedName(defaultValue[0]);
    updateChanges(name, defaultValue);
  }, [defaultValue]);

  const debounce = (callback: Function) => {
    var debounceId: any = null;
    return (name: string, value: string[], time?: number) => {
      clearTimeout(debounceId);
      debounceId = setTimeout(() => {
        callback(name, value);
      }, time ?? 500);
    };
  };
  const updateChanges = debounce(handleAnswerChange);
  if (!changedName || !changedDoB) {
    return <></>;
  }

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
          field: { onChange, value = defaultValue || ['', ''] },
          fieldState: { error },
        }) => {
          return (
            <div>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex gap-2 mb-2 items-center">
                  <div className="font-semibold mr-4">
                    {openNameEdit ? (
                      <input
                        disabled={readonly}
                        value={changedName}
                        onChange={(e) => {
                          setChangedName(e.target.value);
                        }}
                        className="p-2 border rounded-md "
                        style={{
                          backgroundColor: '#F8F9FAFF',
                          borderColor: '#BCC1CAFF',
                        }}
                      />
                    ) : (
                      <div className="capitalize">{value[0]}</div>
                    )}
                  </div>
                  {openNameEdit ? (
                    <Save
                      className="w-4 h-4 text-gray-500 cursor-pointer"
                      onClick={() => {
                        setOpenNameEdit(false);
                        if (value && Array.isArray(value)) {
                          value[0] = changedName;
                          onChange(value);
                          updateChanges(name, value);
                          // updateChanges(name, value);
                        } else {
                          onChange([changedName, '']);
                          updateChanges(name, [changedName, '']);
                        }
                      }}
                    />
                  ) : (
                    <Edit
                      className="w-4 h-4 text-gray-500 cursor-pointer"
                      onClick={() => setOpenNameEdit(true)}
                    />
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Self | Male | 40 years
                </div>

                <div className="flex mb-2">
                  <div className="w-20 text-gray-600">DOB</div>
                  <div className="flex gap-2  items-center">
                    {openDOBEdit ? (
                      <div>
                        <DatePicker
                          className="border p-1 rounded-sm"
                          selected={
                            changedDoB
                              ? new Date(
                                  changedDoB.split('-').reverse().join('-'),
                                )
                              : new Date()
                          }
                          dateFormat="dd-MM-yyyy"
                          maxDate={new Date()}
                          onChange={(date) => {
                            setChangedDOB(moment(date).format('DD-MM-yyyy'));
                          }}
                        />
                      </div>
                    ) : (
                      <div className="mr-4">{value[1]}</div> // dd-mm-yyyy
                    )}

                    {openDOBEdit ? (
                      <Save
                        data-tooltip-target="tooltip-top"
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        aria-label="Save"
                        onClick={() => {
                          setOpenDOBEdit(false);
                          if (changedDoB && value && Array.isArray(value)) {
                            value[1] = changedDoB;
                            onChange(value);
                            updateChanges(name, value);
                          }
                        }}
                      />
                    ) : (
                      <Edit
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => setOpenDOBEdit(true)}
                        aria-label="Edit"
                      />
                    )}
                  </div>
                </div>
                <ErrorComponent
                  errorMessage={error?.message}
                  isVisible={Boolean(error)}
                />
              </div>
            </div>
          );
        }}
      ></Controller>
    </div>
  );
};

export default NameAndDob;
