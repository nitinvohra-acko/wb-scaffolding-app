'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { QuestionConfig } from '../type';

interface propsType {
  questionText: string[] | null;
  options: QuestionConfig['option'];
  handleChange: (option: string[]) => void;
}
const TelemerSelect: React.FC<propsType> = ({
  questionText,
  options,
  handleChange,
}) => {
  //   const [noOne, setNoOne] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<[] | string[]>([]);
  //   const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
  //     {
  //       id: 'akash',
  //       name: 'Akash Bhatia',
  //       conditions: {
  //         noMedical: false,
  //         feverCold: true,
  //         covid: false,
  //         musclePain: false,
  //         longTerm: false,
  //       },
  //       followUpResponse:
  //         'Taking Paracetamol 500 mg twice daily for 3 days. Recovery is partial, with mild symptoms still persisting.',
  //     },
  //     {
  //       id: 'simran',
  //       name: 'Simran Bhatia',
  //       conditions: {
  //         noMedical: false,
  //         feverCold: true,
  //         covid: false,
  //         musclePain: false,
  //         longTerm: false,
  //       },
  //       followUpResponse:
  //         'Taking Paracetamol 500 mg twice daily for 3 days. Recovery is partial, with mild symptoms still persisting.',
  //     },
  //     {
  //       id: 'suman',
  //       name: 'Suman Bhatia',
  //       conditions: {
  //         noMedical: false,
  //         feverCold: false,
  //         covid: false,
  //         musclePain: false,
  //         longTerm: false,
  //       },
  //     },
  //   ]);

  // Check if any family member has fever/cold selected
  //   const hasFeverCold = familyMembers.some((member) => member.conditions.feverCold)

  //   const handleNoOneChange = (checked: boolean) => {
  //     setNoOne(checked)

  //     if (checked) {
  //       // Reset all family member conditions
  //       setFamilyMembers(
  //         familyMembers.map((member) => ({
  //           ...member,
  //           conditions: {
  //             noMedical: false,
  //             feverCold: false,
  //             covid: false,
  //             musclePain: false,
  //             longTerm: false,
  //           },
  //           followUpResponse: undefined,
  //         })),
  //       )
  //     }
  //   }

  //   const handleConditionChange = (
  //     memberId: string,
  //     condition: keyof FamilyMember['conditions'],
  //     checked: boolean,
  //   ) => {
  //     // if (noOne) {
  //     //   setNoOne(false)
  //     // }

  //     setFamilyMembers(
  //       familyMembers.map((member) => {
  //         if (member.id === memberId) {
  //           const updatedConditions = { ...member.conditions };

  //           // If "No medical conditions" is selected, uncheck all other conditions
  //           if (condition === 'noMedical' && checked) {
  //             Object.keys(updatedConditions).forEach((key) => {
  //               updatedConditions[key as keyof FamilyMember['conditions']] =
  //                 false;
  //             });
  //             updatedConditions.noMedical = true;
  //           } else {
  //             // If any other condition is selected, uncheck "No medical conditions"
  //             if (checked) {
  //               updatedConditions.noMedical = false;
  //             }
  //             updatedConditions[condition] = checked;
  //           }

  //           return {
  //             ...member,
  //             conditions: updatedConditions,
  //           };
  //         }
  //         return member;
  //       }),
  //     );
  //   };
  const handleSelectedOptions = (option_value: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedOptions((options) => {
        return [...options, ...[option_value]];
      });
    } else {
      setSelectedOptions((options) => {
        return options.filter((value) => value !== option_value);
      });
    }
  };
  useEffect(() => {
    handleChange(selectedOptions);
  }, [selectedOptions]);
  return (
    <div className="p-4">
      <div className="mb-6">
        {questionText && <p className="font-medium mb-4">{questionText}</p>}
        {/* <div className="flex items-center mb-4">
          <Checkbox id="no-one" checked={noOne} onCheckedChange={(checked) => handleNoOneChange(checked as boolean)} />
          <Label htmlFor="no-one" className="ml-2">
            No one
          </Label>
        </div> */}

        <div className=" pt-2">
          <div className="py-2 grid grid-cols-6 gap-2 border-b border-gray-100">
            <div className="col-span-5 grid grid-cols-5 gap-2">
              {options?.map((option, index) => {
                return (
                  <div className="flex items-center" key={index}>
                    <Checkbox
                      id={`${index}-${option.answer_id}`}
                      //   checked={member.conditions.noMedical}
                      //   disabled={noOne}
                      onCheckedChange={(checked) => {
                        handleSelectedOptions(
                          option.answer_id,
                          Boolean(checked),
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
          {/* {familyMembers.map((member) => (
            <div key={member.id} className="py-2 grid grid-cols-6 gap-2 border-b border-gray-100">
              <div className="col-span-1 flex items-center">
                <span className="text-sm">{member.name}</span>
              </div>

              <div className="col-span-5 grid grid-cols-5 gap-2">
                <div className="flex items-center">
                  <Checkbox
                    id={`${member.id}-no-medical`}
                    checked={member.conditions.noMedical}
                    disabled={noOne}
                    onCheckedChange={(checked) => handleConditionChange(member.id, "noMedical", checked as boolean)}
                  />
                  <Label htmlFor={`${member.id}-no-medical`} className="ml-2 text-sm">
                    No medical conditions
                  </Label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id={`${member.id}-fever-cold`}
                    checked={member.conditions.feverCold}
                    disabled={noOne || member.conditions.noMedical}
                    onCheckedChange={(checked) => handleConditionChange(member.id, "feverCold", checked as boolean)}
                  />
                  <Label htmlFor={`${member.id}-fever-cold`} className="ml-2 text-sm">
                    Fever, Cough, Cold
                  </Label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id={`${member.id}-covid`}
                    checked={member.conditions.covid}
                    disabled={noOne || member.conditions.noMedical}
                    onCheckedChange={(checked) => handleConditionChange(member.id, "covid", checked as boolean)}
                  />
                  <Label htmlFor={`${member.id}-covid`} className="ml-2 text-sm">
                    COVID 19
                  </Label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id={`${member.id}-muscle-pain`}
                    checked={member.conditions.musclePain}
                    disabled={noOne || member.conditions.noMedical}
                    onCheckedChange={(checked) => handleConditionChange(member.id, "musclePain", checked as boolean)}
                  />
                  <Label htmlFor={`${member.id}-muscle-pain`} className="ml-2 text-sm">
                    Muscle Pain
                  </Label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id={`${member.id}-long-term`}
                    checked={member.conditions.longTerm}
                    disabled={noOne || member.conditions.noMedical}
                    onCheckedChange={(checked) => handleConditionChange(member.id, "longTerm", checked as boolean)}
                  />
                  <Label htmlFor={`${member.id}-long-term`} className="ml-2 text-sm">
                    Long term conditions like diabetes, hypertention, thyroid
                  </Label>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};
export default TelemerSelect;
