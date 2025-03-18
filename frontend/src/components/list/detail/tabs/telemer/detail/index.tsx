'use client';

import { Children, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, Edit, CheckCircle } from 'lucide-react';
import { question_Data as config } from '../constant';
import TeleMerInfo from './formComponents/introduction';
import OtherSection from './index1';
import { questionData } from '../constant1';
import TelemerRadio from './formComponents/telemer_radio';
import { formInitState } from './utils';
import { questionConfig } from '../constant2';
import TelemerSelect from './formComponents/telemer_multiselect';
import { sectionType } from './type';

const sectionMap = (index: number) => {
  switch (index) {
    case 0: {
      return 'introduction';
    }
    case 1: {
      return 'Demographic';
    }
    case 2: {
      return 'Demographic';
    }
    case 3: {
      return 'personal';
    }
    case 4: {
      return 'personal';
    }
    case 5: {
      return 'personal';
    }
    default: {
      return 'Health';
    }
  }
};
const sectionList = ['introduction', 'Demographic', 'personal'];
const _Question_CONFIG = sectionList.map((section, index) => {
  return {
    questions: questionConfig.filter((item, indx) => {
      if (section === 'introduction' && indx == 0) {
        return true;
      } else if (section === 'Demographic' && indx < 3 && indx > 0) {
        return true;
      } else if (section === 'personal' && indx < 5 && indx >= 3) {
        return true;
      } else if (section === 'Health') {
        return true;
      } else {
        return false;
      }
    }),
    section: section,
    members: [
      {
        parameters: {
          role: {
            parameter_version: 1,
            value: 'insured',
          },
          relation: {
            parameter_version: 1,
            value: 'Self',
          },
          user_id: {
            parameter_version: 1,
            value: 'fvCiTnou01JeLDtVYSD6ig',
          },
          age: {
            parameter_version: 1,
            value: 45,
          },
          marital_status: {
            parameter_version: 1,
            value: '',
          },
          email: {
            parameter_version: 1,
            value: 'shailesh.singh+ISWv@acko.tech',
          },

          name: {
            parameter_version: 1,
            value: 'selfAutomation',
          },
          gender: {
            parameter_version: 1,
            value: 'female',
          },
        },
        insured_id: 'm8b2kio0m9lorcfq0t',
        insured_number: '1',
        created_on: '2025-03-16T03:21:56.555+00:00',
        updated_on: '2025-03-16T03:22:43.528+00:00',
      },
      {
        parameters: {
          role: {
            parameter_version: 1,
            value: 'insured',
          },
          relation: {
            parameter_version: 1,
            value: 'Spouse',
          },

          marital_status: {
            parameter_version: 1,
            value: '',
          },
          user_id: {
            parameter_version: 1,
            value: '2vCiTnou01JeLDtVYSfr44g',
          },
          email: {
            parameter_version: 1,
            value: '',
          },
          name: {
            parameter_version: 1,
            value: 'SpouseAutomation',
          },
          gender: {
            parameter_version: 1,
            value: 'male',
          },
        },
        insured_id: 'm8b2kjq5zm3otslj4fs',
        insured_number: '2',
        created_on: '2025-03-16T03:21:56.555+00:00',
        updated_on: '2025-03-16T03:22:43.528+00:00',
      },
    ],
  };
});

const QUESTION_CONFIG = questionConfig.map((item, index) => {
  return {
    questions: item,
    section: sectionMap(index),
    members: [
      {
        parameters: {
          role: {
            parameter_version: 1,
            value: 'insured',
          },
          relation: {
            parameter_version: 1,
            value: 'Self',
          },
          user_id: {
            parameter_version: 1,
            value: 'fvCiTnou01JeLDtVYSD6ig',
          },
          age: {
            parameter_version: 1,
            value: 45,
          },
          marital_status: {
            parameter_version: 1,
            value: '',
          },
          email: {
            parameter_version: 1,
            value: 'shailesh.singh+ISWv@acko.tech',
          },

          name: {
            parameter_version: 1,
            value: 'selfAutomation',
          },
          gender: {
            parameter_version: 1,
            value: 'female',
          },
        },
        insured_id: 'm8b2kio0m9lorcfq0t',
        insured_number: '1',
        created_on: '2025-03-16T03:21:56.555+00:00',
        updated_on: '2025-03-16T03:22:43.528+00:00',
      },
      {
        parameters: {
          role: {
            parameter_version: 1,
            value: 'insured',
          },
          relation: {
            parameter_version: 1,
            value: 'Spouse',
          },

          marital_status: {
            parameter_version: 1,
            value: '',
          },
          user_id: {
            parameter_version: 1,
            value: '2vCiTnou01JeLDtVYSfr44g',
          },
          email: {
            parameter_version: 1,
            value: '',
          },
          name: {
            parameter_version: 1,
            value: 'SpouseAutomation',
          },
          gender: {
            parameter_version: 1,
            value: 'male',
          },
        },
        insured_id: 'm8b2kjq5zm3otslj4fs',
        insured_number: '2',
        created_on: '2025-03-16T03:21:56.555+00:00',
        updated_on: '2025-03-16T03:22:43.528+00:00',
      },
    ],
  };
});

export default function HealthProfile() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [_questionConfig, setQuestionConfig] =
    useState<sectionType[]>(_Question_CONFIG);

  useEffect(() => {
    console.log('_questionConfig', _questionConfig);
  }, [_questionConfig]);

  const handleFormUpdate = (
    question_id: string,
    value: string | string[],
    user_id: string,
    _section: string,
  ) => {
    console.log(
      'question id, value, user_id',
      question_id,
      value,
      user_id,
      _section,
    );
    setQuestionConfig((sections) => {
      let result = sections.map((section) => {
        if (section.section === _section) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.question_id === question_id) {
                let _answer = question.question_config?.answer || [];
                if (_answer.find((ans) => ans.user_id === user_id)) {
                  // existing, update
                  _answer = _answer.map((ans: any) => {
                    if (ans.user_id === user_id) {
                      return { ...ans, answer_id: value, answer: value };
                    }
                    return ans;
                  });
                } else {
                  _answer.push({ answer_id: value, answer: value, user_id });
                }

                let _r = {
                  ...question,
                  question_config: {
                    ...question.question_config,
                    answer: _answer,
                  },
                };
                console.log('answer__', _answer, _r);
                return _r;
              } else {
                return question;
              }
            }),
          };
        } else {
          return section;
        }
        // if (section.questions.question_id === question_id) {
        //   let _answer = section.questions.question_config?.answer || [];

        //   // answer = [{user_id:1, answer_id: string | string[], answer: string | string[]}];

        //   if (
        //     _answer.find(
        //       (ans: { answer_id: string; user_id: string }) =>
        //         ans.user_id === user_id,
        //     )
        //   ) {
        //     // existing, update
        //     _answer = _answer.map((ans: any) => {
        //       if (ans.user_id === user_id) {
        //         return { ...ans, answer_id: value, answer: value };
        //       }
        //       return ans;
        //     });
        //   } else {
        //     // push new answer
        //     _answer.push({ answer_id: value, answer: value, user_id });
        //   }
        //   // check answer exist? match if answer_id === value? Y:N
        //   // yes-> update
        //   // no -> insert
        //   return {
        //     ...section,
        //     questions: {
        //       ...section.questions,
        //       question_config: { ...section.questions, answer: _answer },
        //     },
        //   };
        // }
        // return section;
      });
      return result;
    });
  };
  useEffect(() => {
    // setQuestionConfig(QUESTION_CONFIG);
    // flatten the questions
    let allQuestions: any = [];
    questionData.forEach((item) => {
      allQuestions = [...allQuestions, ...item.questions];
    });

    let flatData = formInitState(allQuestions);
    let memberQuestion = {};
    let _questions: any[] = [];
    // render section
    // render question
    // render members + options
    // . correct

    // collect all uniq members

    let uniqueMembers: any[] = [];
    questionData.map((items) => {
      items.members.map((member) => {
        if (
          !uniqueMembers
            ?.map((m) => m.parameters.id.value)
            .includes(member.parameters.id.value)
        ) {
          // push that member in unique list
          uniqueMembers.push(member);
        }
      });
    });
    // pick one by one members and iterat on questions
    uniqueMembers.map((member) => {
      questionData.forEach((_questionData) => {
        if (
          _questionData.members.find(
            (m) => m.parameters.id.value === member.parameters.id.value,
          )
        ) {
          // push that question in for this member
          member.pusj;
        }
      });
    });
    // if member exists? pull that question or pass

    // questionData.forEach((question) => {
    //   question.members.forEach((member) => {
    //     if (Object.keys(memberQuestion).includes(member.parameters.id.value)) {
    //       if (
    //         _questions.find(
    //           (item) =>
    //             item.member?.parameters?.id?.value ===
    //             member.parameters.id.value,
    //         )
    //       ) {
    //         //
    //       }
    //       memberQuestion[member.parameters.id.value] = [
    //         ...memberQuestion[member.parameters.id.value],
    //         ...question.questions,
    //       ];
    //     } else {
    //       memberQuestion[member.parameters.id.value] = question.questions;
    //     }
    //   });
    // });
    console.log('memberQuestion', memberQuestion);
  }, []);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  const IntroductionSection = ({ data }: { data: any }) => {
    return (
      <Card className="mb-4 shadow-sm">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection('introduction')}
        >
          <h2 className="text-lg font-semibold">Introduction</h2>
          <ChevronDown className="w-6 h-6 text-purple-500" />
        </div>
        {activeSection === 'introduction' && (
          <CardContent>
            <TeleMerInfo label={data.question_text} />
          </CardContent>
        )}
      </Card>
    );
  };

  const Accordian: React.FC<{
    title: string;
    children: React.ReactElement;
  }> = ({ title, children }) => {
    return (
      <Card className="mb-4 shadow-sm">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection(title)}
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <ChevronDown className="w-6 h-6 text-purple-500" />
        </div>
        {activeSection === title && <CardContent>{children}</CardContent>}
      </Card>
    );
  };

  const DemographicSection = (data: any) => {
    return (
      <Card className="mb-4 shadow-sm">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection(data.section)}
        >
          <h2 className="text-lg font-semibold">{data.section}</h2>
          <ChevronDown className="w-6 h-6 text-purple-500" />
        </div>
        {data.section === activeSection && (
          <CardContent>
            <div className="p-4">
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="mb-4">
                  So I am talking to "Akash Bhatia", can you please confirm your
                  DOB?
                </p>

                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold">Akash Bhatia</div>
                    <Edit className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Self | Male | 40 years
                  </div>

                  <div className="flex mb-2">
                    <div className="w-20 text-gray-600">DOB</div>
                    <div className="flex justify-between flex-1">
                      <div>25 Jan'1985</div>
                      <Edit className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>

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
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                      >
                        cm
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="w-20 text-gray-600">Weight</div>
                    <div className="flex">
                      <Input
                        className="w-16 h-8 rounded-r-none"
                        placeholder=""
                      />
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
              </div>

              {/* Wife's Details */}
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="mb-4">
                  Can you please confirm your wife's name and DOB?
                </p>

                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold">Simran Bhatia</div>
                    <Edit className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Spouse | Female | 39 years
                  </div>

                  <div className="flex mb-2">
                    <div className="w-20 text-gray-600">DOB</div>
                    <div className="flex justify-between flex-1">
                      <div>25 Feb'1986</div>
                      <Edit className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>

                <p className="my-4">
                  Please tell me your wife's height & weight:
                </p>

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
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                      >
                        cm
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="w-20 text-gray-600">Weight</div>
                    <div className="flex">
                      <Input
                        className="w-16 h-8 rounded-r-none"
                        placeholder=""
                      />
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
              </div>

              {/* Daughter's Details */}
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-4">
                  Can you please confirm your daughter's name and DOB?
                </p>

                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold">Suman Bhatia</div>
                    <Edit className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Child | Female | 9 years
                  </div>

                  <div className="flex mb-2">
                    <div className="w-20 text-gray-600">DOB</div>
                    <div className="flex justify-between flex-1">
                      <div>29 Sep'2016</div>
                      <Edit className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <Button
                variant="default"
                size="lg"
                className="h-8 bg-gray-800 text-white text-xs"
              >
                Next
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">Health profile</h1>
        <div className="flex items-center text-purple-500 gap-1">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">Auto saved</span>
        </div>
      </div>
      {/* {IntroductionSection(
        config.find((item) => item.section === 'introduction'),
      )} */}

      {/* static section will use this UI only */}
      <OtherSection />

      <div>
        {_questionConfig.map(({ section, questions, members }, index) => {
          return (
            <div key={index}>
              <Accordian title={section}>
                {/* render question list */}
                <>
                  {questions?.map((question, queIndex) => {
                    if (question.question_config.type === 'telemer_info') {
                      return (
                        <div key={queIndex}>
                          <TeleMerInfo
                            label={question.question_config.question_text}
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={queIndex}>
                        Question text: {question.question_config.question_text}
                        <div>
                          {members.map((member, index) => {
                            return (
                              <div key={index}>
                                <div className="font-bold">
                                  {member.parameters.name?.value}
                                </div>

                                {question.question_config.type ===
                                  'telemer_radio_group' && (
                                  <TelemerRadio
                                    questionText={null}
                                    question_id={
                                      question.question_config.question_id
                                    }
                                    options={question.question_config.option}
                                    handleChange={(value) => {
                                      handleFormUpdate(
                                        question.question_id,
                                        value,
                                        member.parameters.user_id?.value,
                                        section,
                                      );
                                    }}
                                  />
                                )}
                                {question.question_config.type ===
                                  'telemer_multi_select' && (
                                  <TelemerSelect
                                    questionText={null}
                                    options={question.question_config.option}
                                    handleChange={(options) => {
                                      console.log('options', options);
                                      handleFormUpdate(
                                        question.question_id,
                                        options,
                                        member.parameters.user_id?.value,
                                        section,
                                      );
                                    }}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              </Accordian>
            </div>
          );
        })}
      </div>
    </div>
  );
}
