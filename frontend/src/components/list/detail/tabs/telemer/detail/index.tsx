'use client';
import { useCallback, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import TeleMerInfo from './formComponents/introduction';
import { formInitState, getUniqueMembers, updateObjectByKey } from './utils';
import { QuestionsType, QuestionConfig, member } from './type';
import { useForm } from 'react-hook-form';
import React from 'react';
import WidgetMap from './widgetMap';
import { question_Data4 } from '../constant4';
import SectionAccordian from './section';
import useTelemer from '../hooks/useTelemer';

const sectionList = [
  'introduction',
  'Demographic details',
  'Habits',
  'Pre existing conditions',
];

export default function HealthProfile({ readonly }: { readonly: Boolean }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState({});
  const [globalQuestion, setGlobalQuestion] =
    useState<QuestionsType[]>(question_Data4);
  const { fetchTelemerConfig, loading } = useTelemer();

  const { control, getValues, reset, trigger, formState, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: memberForm,
    // context: {
    //   familyConstraints: isAsp ? familyConstraintsAsp : familyConstraints,
    //   members: previousMembers,
    // } as object,
    // resolver: resolver as Resolver<
    //   Record<string, MemberTypeWithMarialStatus>,
    //   object
    // >,
  });
  const navigateToSection = (direction: 'next' | 'previous') => {
    const currentIndex = sectionList.findIndex(
      (section) => section === activeSection,
    );
    let newIndex;

    if (direction === 'next') {
      newIndex =
        currentIndex < sectionList.length - 1 ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }

    setActiveSection(sectionList[newIndex]);
  };
  useEffect(() => {
    fetchTelemerConfig();
    const uniqueMembers = getUniqueMembers(question_Data4);
    let memberQuestion = {};
    uniqueMembers.map((member) => {
      memberQuestion = {
        ...memberQuestion,
        [member.user_id]: formInitState(
          question_Data4
            .map((item) => {
              return item.question_config;
            })
            .filter((que) => {
              return que?.question_id !== 'telemer_info';
            }),
        ),
      };
    });
    setMemberForm(memberQuestion);
  }, []);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  // const IntroductionSection = ({ data }: { data: any }) => {
  //   return (
  //     <Card className="mb-4 shadow-sm">
  //       <div
  //         className="flex justify-between items-center p-4 cursor-pointer"
  //         onClick={() => toggleSection('introduction')}
  //       >
  //         <h2 className="text-lg font-semibold">Introduction</h2>
  //         <ChevronDown className="w-6 h-6 text-purple-500" />
  //       </div>
  //       {activeSection === 'introduction' && (
  //         <CardContent>
  //           <TeleMerInfo label={data.question_text} />
  //         </CardContent>
  //       )}
  //     </Card>
  //   );
  // };

  // const DemographicSection = (data: any) => {
  //   return (
  //     <Card className="mb-4 shadow-sm">
  //       <div
  //         className="flex justify-between items-center p-4 cursor-pointer"
  //         onClick={() => toggleSection(data.section)}
  //       >
  //         <h2 className="text-lg font-semibold">{data.section}</h2>
  //         <ChevronDown className="w-6 h-6 text-purple-500" />
  //       </div>
  //       {data.section === activeSection && (
  //         <CardContent>
  //           <div className="p-4">
  //             <div className="bg-gray-50 p-4 rounded-md mb-4">
  //               <p className="mb-4">
  //                 So I am talking to "Akash Bhatia", can you please confirm your
  //                 DOB?
  //               </p>

  //               <div className="bg-gray-100 p-4 rounded-md">
  //                 <div className="flex justify-between mb-2">
  //                   <div className="font-semibold">Akash Bhatia</div>
  //                   <Edit className="w-4 h-4 text-gray-500" />
  //                 </div>
  //                 <div className="text-sm text-gray-600 mb-4">
  //                   Self | Male | 40 years
  //                 </div>

  //                 <div className="flex mb-2">
  //                   <div className="w-20 text-gray-600">DOB</div>
  //                   <div className="flex justify-between flex-1">
  //                     <div>25 Jan'1985</div>
  //                     <Edit className="w-4 h-4 text-gray-500" />
  //                   </div>
  //                 </div>
  //               </div>

  //               <p className="my-4">Please tell me your height & weight:</p>

  //               <div className="bg-gray-100 p-4 rounded-md">
  //                 <div className="flex items-center mb-3">
  //                   <div className="w-20 text-gray-600">Height</div>
  //                   <div className="flex gap-2">
  //                     <div className="flex">
  //                       <Input
  //                         className="w-16 h-8 rounded-r-none"
  //                         placeholder=""
  //                       />
  //                       <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
  //                         ft
  //                       </div>
  //                     </div>
  //                     <div className="flex">
  //                       <Input
  //                         className="w-16 h-8 rounded-r-none"
  //                         placeholder=""
  //                       />
  //                       <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
  //                         in
  //                       </div>
  //                     </div>
  //                     <Button
  //                       variant="default"
  //                       size="sm"
  //                       className="h-8 bg-gray-800 text-white text-xs"
  //                     >
  //                       ft/in
  //                     </Button>
  //                     <Button
  //                       variant="outline"
  //                       size="sm"
  //                       className="h-8 text-xs"
  //                     >
  //                       cm
  //                     </Button>
  //                   </div>
  //                 </div>

  //                 <div className="flex items-center mb-3">
  //                   <div className="w-20 text-gray-600">Weight</div>
  //                   <div className="flex">
  //                     <Input
  //                       className="w-16 h-8 rounded-r-none"
  //                       placeholder=""
  //                     />
  //                     <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
  //                       in kgs
  //                     </div>
  //                   </div>
  //                 </div>

  //                 <div className="flex items-center">
  //                   <div className="w-20 text-gray-600">BMI</div>
  //                   <div>NA</div>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Wife's Details */}
  //             <div className="bg-gray-50 p-4 rounded-md mb-4">
  //               <p className="mb-4">
  //                 Can you please confirm your wife's name and DOB?
  //               </p>

  //               <div className="bg-gray-100 p-4 rounded-md">
  //                 <div className="flex justify-between mb-2">
  //                   <div className="font-semibold">Simran Bhatia</div>
  //                   <Edit className="w-4 h-4 text-gray-500" />
  //                 </div>
  //                 <div className="text-sm text-gray-600 mb-4">
  //                   Spouse | Female | 39 years
  //                 </div>

  //                 <div className="flex mb-2">
  //                   <div className="w-20 text-gray-600">DOB</div>
  //                   <div className="flex justify-between flex-1">
  //                     <div>25 Feb'1986</div>
  //                     <Edit className="w-4 h-4 text-gray-500" />
  //                   </div>
  //                 </div>
  //               </div>

  //               <p className="my-4">
  //                 Please tell me your wife's height & weight:
  //               </p>

  //               <div className="bg-gray-100 p-4 rounded-md">
  //                 <div className="flex items-center mb-3">
  //                   <div className="w-20 text-gray-600">Height</div>
  //                   <div className="flex gap-2">
  //                     <div className="flex">
  //                       <Input
  //                         className="w-16 h-8 rounded-r-none"
  //                         placeholder=""
  //                       />
  //                       <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
  //                         ft
  //                       </div>
  //                     </div>
  //                     <div className="flex">
  //                       <Input
  //                         className="w-16 h-8 rounded-r-none"
  //                         placeholder=""
  //                       />
  //                       <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
  //                         in
  //                       </div>
  //                     </div>
  //                     <Button
  //                       variant="default"
  //                       size="sm"
  //                       className="h-8 bg-gray-800 text-white text-xs"
  //                     >
  //                       ft/in
  //                     </Button>
  //                     <Button
  //                       variant="outline"
  //                       size="sm"
  //                       className="h-8 text-xs"
  //                     >
  //                       cm
  //                     </Button>
  //                   </div>
  //                 </div>

  //                 <div className="flex items-center mb-3">
  //                   <div className="w-20 text-gray-600">Weight</div>
  //                   <div className="flex">
  //                     <Input
  //                       className="w-16 h-8 rounded-r-none"
  //                       placeholder=""
  //                     />
  //                     <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
  //                       in kgs
  //                     </div>
  //                   </div>
  //                 </div>

  //                 <div className="flex items-center">
  //                   <div className="w-20 text-gray-600">BMI</div>
  //                   <div>NA</div>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Daughter's Details */}
  //             <div className="bg-gray-50 p-4 rounded-md">
  //               <p className="mb-4">
  //                 Can you please confirm your daughter's name and DOB?
  //               </p>

  //               <div className="bg-gray-100 p-4 rounded-md">
  //                 <div className="flex justify-between mb-2">
  //                   <div className="font-semibold">Suman Bhatia</div>
  //                   <Edit className="w-4 h-4 text-gray-500" />
  //                 </div>
  //                 <div className="text-sm text-gray-600 mb-4">
  //                   Child | Female | 9 years
  //                 </div>

  //                 <div className="flex mb-2">
  //                   <div className="w-20 text-gray-600">DOB</div>
  //                   <div className="flex justify-between flex-1">
  //                     <div>29 Sep'2016</div>
  //                     <Edit className="w-4 h-4 text-gray-500" />
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="mb-4 flex flex-col items-center">
  //             <Button
  //               variant="default"
  //               size="lg"
  //               className="h-8 bg-gray-800 text-white text-xs"
  //             >
  //               Next
  //             </Button>
  //           </div>
  //         </CardContent>
  //       )}
  //     </Card>
  //   );
  // };
  const handleAnswerChange = useCallback(
    (question_id: string, user_id: string, value: string | string[]) => {
      const _questions: QuestionsType[] = [...globalQuestion];
      console.log('_question', _questions, question_id, value, user_id);
      updateObjectByKey(_questions, 'question_id', question_id, value, user_id);
      setGlobalQuestion(_questions);
    },
    [globalQuestion],
  );
  useEffect(() => {
    console.log('global lgo', globalQuestion);
  }, [globalQuestion]);

  const renderQuestion = useCallback(
    (config: QuestionConfig, member: member) => {
      return (
        <>
          {Object.keys(WidgetMap).includes(config.type) &&
            React.createElement(WidgetMap[config.type], {
              control,
              name: `${member.user_id}.${config.question_id}`,
              label: member.name,
              required: config.required,
              key: `${member.user_id}.${config.question_id}`,
              defaultValue: '',
              answer_id: '',
              answer: config.answer,
              options: config?.option,
              handleAnswerChange: (
                user_response: string,
                value: string | string[],
              ) => {
                handleAnswerChange(
                  user_response.split('.')[1], // qus id
                  user_response.split('.')[0], // user id
                  value,
                );
              },
            })}
        </>
      );
    },
    [control, handleAnswerChange, readonly],
  );

  const renderElement = useCallback(
    (
      config: QuestionConfig,
      eligible_members: { user_id: string; name: string }[],
    ) => {
      return (
        <>
          <div
            className="font-bold pb-2 text-base"
            style={{ color: '#171A1FFF' }}
          >
            {config.question_text}
          </div>
          <div className="pl-2">
            {/* showing options for each member */}
            {eligible_members &&
              eligible_members.map((member, index) => {
                return (
                  <div key={index}>
                    {renderQuestion(config, member)}
                    {renderSubQuestion(config, member)}
                  </div>
                );
              })}
          </div>
        </>
      );
    },
    [control, handleAnswerChange, globalQuestion],
  );
  const renderSubQuestion = useCallback(
    (config: QuestionConfig, member: member) => {
      const response = getValues();
      const user_response = Object.keys(response).includes(member.user_id)
        ? response[member.user_id as keyof typeof response]
        : null;

      if (
        !(
          user_response &&
          Object.keys(user_response).includes(config.question_id)
        )
      ) {
        return <></>;
      }

      if (user_response && user_response[config.question_id]) {
        if (Array.isArray(user_response[config.question_id])) {
          if (config?.sub_question_mapping) {
            let _subQuestions: any = Object.entries(
              config?.sub_question_mapping,
            )?.reduce((acc: string[], [key, value]): any => {
              //@ts-ignore
              if (user_response[config.question_id]?.includes(key)) {
                acc = [...acc, ...value];
              }
              return acc;
            }, []);
            _subQuestions = new Set([..._subQuestions]);
            const res = config?.sub_questions?.filter((question) => {
              if (Array.from(_subQuestions).includes(question.question_id)) {
                return question;
              }
            });
            if (res && res?.length > 0) {
              return res.map((conf, index) => (
                <div
                  key={index + config.question_id}
                  className="border rounded-md p-2 mb-3"
                  // style={{backgroundColor:""}}
                >
                  <div>{conf.question_config.question_text}</div>
                  {renderQuestion(conf.question_config, member)}
                </div>
              ));
            }
          } else {
            return <></>;
          }
        } else {
          if (
            config?.sub_question_mapping &&
            user_response[config.question_id]
          ) {
            const res = config?.sub_questions?.filter((question) => {
              if (
                config?.sub_question_mapping![
                  user_response[config.question_id] as string
                ]?.includes(question.question_id)
              ) {
                return question.question_config;
              }
            });
            if (res && res?.length > 0) {
              return res.map((conf, index) => (
                <div
                  key={index + config.question_id}
                  className="border rounded-md p-2 mb-3 ml-4"
                  // style={{backgroundColor:""}}
                >
                  <div>{conf.question_config.question_text}</div>
                  {renderQuestion(conf.question_config, member)}
                </div>
              ));
            }
          } else {
            return <></>;
          }
        }
      }
    },
    [control],
  );

  const renderInfo = useCallback((config: QuestionsType['question_config']) => {
    return <TeleMerInfo label={config.question_text} />;
  }, []);

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

      <div>
        {sectionList?.map((section, index) => {
          return (
            <SectionAccordian
              title={section}
              key={index}
              toggleSection={toggleSection}
              activeSection={activeSection}
              navigateToSection={navigateToSection}
            >
              <>
                {globalQuestion
                  ?.filter((item) => item.section === section)
                  .map((question, ndx) => {
                    if (question.question_config.type === 'telemer_info') {
                      return (
                        <div key={index + '-' + ndx}>
                          {renderInfo(question.question_config)}
                        </div>
                      );
                    }
                    return (
                      <div key={index + '-' + ndx}>
                        {renderElement(
                          question.question_config,
                          question.eligible_members,
                        )}
                      </div>
                    );
                  })}
              </>
            </SectionAccordian>
          );
        })}
      </div>
    </div>
  );
}
