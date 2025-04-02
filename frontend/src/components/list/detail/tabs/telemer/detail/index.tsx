'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import TeleMerInfo from './formComponents/introduction';
import {
  formInitState,
  getUniqueMembers,
  updateObjectByKey,
  requestMapping,
  questionSchema,
  getUniquSection,
} from './utils';
import { QuestionsType, QuestionConfig, member } from './type';
import { Resolver, useForm } from 'react-hook-form';
import React from 'react';
import WidgetMap from './widgetMap';
import { question_Data4 } from '../constant4';
import SectionAccordian from './section';
import useTelemer from '../hooks/useTelemer';
import useTelemerStore from '../store/telemer';
import QuestionText from './formComponents/questionText';
import PageLoader from '@/components/ui/loader';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface PropsType {
  handleLayout: (l: 'vertical' | 'horizontal') => void;
  layout: 'vertical' | 'horizontal';
  readonly: boolean;
  taskDetail: any;
}
export default function HealthProfile({ readonly }: PropsType) {
  const params = useParams();
  const { toast } = useToast();

  const [activeSection, setActiveSection] = useState<string | null>(
    'introduction',
  );
  const [_loading, _setLoading] = useState(false);
  const [memberForm, setMemberForm] = useState<
    Record<string, any> | undefined
  >();
  // const [globalQuestion, setGlobalQuestion] =
  //   useState<QuestionsType[]>(question_Data4);

  const { fetchTelemerConfig, loading } = useTelemer();
  const hoistResponse = useTelemerStore().hoistResponse;
  const questions = useTelemerStore().memberResponse;
  const questionConfig = useTelemerStore().questionConfig;

  const zSchema = useMemo(() => {
    const zodExpressions: Record<string, z.ZodTypeAny> = {};
    questionConfig.forEach((config) => {
      questionSchema(config, zodExpressions);
    });
    return z.record(z.string(), z.object(zodExpressions));
  }, [questionConfig]);

  const { control, getValues, reset, trigger, formState, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: memberForm,
    resolver: zodResolver(zSchema),
  });

  const handleSubmit = async () => {
    trigger();
    if (!formState.isValid) {
      toast({
        title: 'Error',
        description: `Please complete the required fields.`,
      });
      console.log('isvalid>>', formState.isValid);
      return;
    }
    const MemberResponse = requestMapping([...questions]);
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      _setLoading(true);
      const raw = JSON.stringify({
        journey: 'rap',
        reference_id: params.slug ? params.slug[0] : '',
        source: 'health',
        questions: MemberResponse,
      });

      const response = await fetch('/questions/answers', {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const resp = await response.json();
      // runWorkflow();
    } catch (err) {
      _setLoading(false);
      console.log('error at submit');
    }
  };

  const navigateToSection = (direction: 'next' | 'previous') => {
    const currentIndex = allSections.findIndex(
      (section) => section === activeSection,
    );
    let newIndex;

    if (direction === 'next') {
      newIndex =
        currentIndex < allSections.length - 1 ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }
    setActiveSection(allSections[newIndex]);
  };
  const allSections: string[] = useMemo(() => {
    return getUniquSection(questions);
  }, [questions]);

  useEffect(() => {
    fetchTelemerConfig();
  }, []);

  useEffect(() => {
    createMemberForm();
  }, [questionConfig]);

  const createMemberForm = useCallback(() => {
    if (Array.isArray(questionConfig) && questionConfig.length > 0) {
      const uniqueMembers = getUniqueMembers(questionConfig);
      const _questions = [...question_Data4];
      let memberQuestion = {};

      uniqueMembers.forEach((member) => {
        // read members current name and DOB from proposal and update the answers
        let _name_dob = [member.name, '15-04-1993'];
        let _height_weight = ['0', '0'];

        memberQuestion = {
          ...memberQuestion,
          [member.user_id]: formInitState(
            _questions
              .map((item) => {
                let question_config = item.question_config;
                if (item.question_id === 'name_dob') {
                  return { ...question_config, value: _name_dob };
                } else if (item.question_id === 'height_weight') {
                  return { ...question_config, value: _height_weight };
                }
                return item.question_config;
              })
              .filter((que) => {
                return que?.question_id !== 'telemer_info';
              }),
          ),
        };
      });
      setMemberForm(memberQuestion);
    }
  }, [questionConfig]);

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
      const _questions: QuestionsType[] = [...questions];
      // console.log('_question', _questions, question_id, value, user_id);
      updateObjectByKey(_questions, 'question_id', question_id, value, user_id);
      // setGlobalQuestion(_questions);
      // console.log('questions', _questions);
      hoistResponse(_questions);
      // trigger(user_id.question_id);
    },
    [questions, questionConfig],
  );

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
              defaultValue:
                memberForm && Object.keys(memberForm).includes(member.user_id)
                  ? memberForm[member.user_id][config.question_id]
                  : '',
              answer_id: '',
              answer: config.answer,
              options: config?.option,
              readonly,
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
    [
      control,
      handleAnswerChange,
      readonly,
      memberForm,
      questionConfig,
      questions,
    ],
  );

  const renderElement = useCallback(
    (
      config: QuestionConfig,
      eligible_members: { user_id: string; name: string }[],
    ) => {
      if (config.type === 'telemer_info') {
        return renderInfo(config);
      }
      return (
        <div className="py-4 border-b">
          <QuestionText
            question_text={config.question_text}
            required={config.required}
          />
          <div className="pl-2">
            {/* showing options for each member */}
            {eligible_members ? (
              eligible_members.map((member, index) => {
                return (
                  <div key={index}>
                    {renderQuestion(config, member)}
                    {renderSubQuestion(config, member)}
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    },
    [control, handleAnswerChange, questions, memberForm],
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
                  <QuestionText
                    question_text={conf.question_config?.question_text}
                    required={conf.question_config.required}
                  />
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
                  <QuestionText
                    question_text={conf.question_config?.question_text}
                    required={conf.question_config.required}
                  />
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
    [control, questions],
  );

  const renderInfo = useCallback((config: QuestionsType['question_config']) => {
    return <TeleMerInfo label={config.question_text} />;
  }, []);

  return (
    <div className="mx-auto w-full">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">Health profile</h1>
        <div className="flex items-center text-purple-500 gap-1">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">Auto saved</span>
          {(loading || _loading) && <PageLoader />}
        </div>
      </div>
      <div>
        {allSections?.map((section, index) => {
          return (
            <SectionAccordian
              title={section}
              key={index}
              toggleSection={toggleSection}
              activeSection={activeSection}
              navigateToSection={navigateToSection}
              handleSubmit={handleSubmit}
              sectionList={allSections}
            >
              <>
                {questions
                  ?.filter((item) => item.section === section)
                  .map((question, ndx) => {
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
