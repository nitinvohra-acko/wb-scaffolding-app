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
import { useForm } from 'react-hook-form';
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
import { apiClient } from '@/utils/interceptor';
import { TaskDetail } from '@/types/task';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useTaskDetail from '@/hooks/useTaskDetails';

interface PropsType {
  handleLayout: (l: 'vertical' | 'horizontal') => void;
  readonly: boolean;
  taskDetail: TaskDetail;
}
export default function HealthProfile({ readonly, taskDetail }: PropsType) {
  const params = useParams();
  const { toast } = useToast();
  const { fetchTaskDetail, loading: taskLoading } = useTaskDetail();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(
    'introduction',
  );
  const [_loading, _setLoading] = useState(false);
  const [memberForm, setMemberForm] = useState<
    Record<string, any> | undefined
  >();
  const { fetchTelemerConfig, loading } = useTelemer();
  const hoistResponse = useTelemerStore().hoistResponse;
  const questions = useTelemerStore().memberResponse;
  const questionConfig = useTelemerStore().questionConfig;

  const allSections: string[] = useMemo(() => {
    return getUniquSection(questions);
  }, [questions]);

  const zSchema = useMemo(() => {
    const zodExpressions: Record<string, z.ZodTypeAny> = {};
    questionConfig.forEach((config) => {
      questionSchema(config, zodExpressions);
    });
    return z.record(z.string(), z.object(zodExpressions));
  }, [questionConfig]);

  const { control, getValues, trigger, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: memberForm,
    resolver: zodResolver(zSchema),
  });

  const handleSubmit = async () => {
    if (!formState.isValid) {
      toast({
        title: 'Error',
        description: `Please complete the required fields.`,
      });
      return;
    }
    _setLoading(true);
    const MemberResponse = requestMapping([...questions]);
    try {
      const response = await apiClient('/questions/answers', 'POST', {
        body: {
          journey: 'rap',
          reference_id: params.slug ? params.slug[0] : '',
          source: 'health',
          questions: MemberResponse,
        },
      });
      fetchTaskDetail(taskDetail.id);
      _setLoading(false);
    } catch (err) {
      _setLoading(false);
      console.log('error at submit', err);
    }
  };

  const navigateToSection = useCallback(
    (direction: 'next' | 'previous') => {
      const currentIndex = allSections.findIndex(
        (section) => section === activeSection,
      );
      let newIndex;

      if (direction === 'next') {
        newIndex =
          currentIndex < allSections.length - 1
            ? currentIndex + 1
            : currentIndex;
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
      }
      setActiveSection(allSections[newIndex]);
    },
    [formState, activeSection, allSections],
  );

  useEffect(() => {
    if (taskDetail?.businessEntityImpl?.proposalId) {
      fetchTelemerConfig(taskDetail?.businessEntityImpl?.proposalId);
    }
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

  const handleAnswerChange = useCallback(
    (question_id: string, user_id: string, value: string | string[]) => {
      const _questions: QuestionsType[] = [...questions];
      updateObjectByKey(_questions, 'question_id', question_id, value, user_id);
      hoistResponse(_questions);
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
            const res = config?.subQuestions?.filter((question) => {
              if (
                Array.from(_subQuestions).includes(
                  question.question_config.question_id,
                )
              ) {
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
            const res = config?.subQuestions?.filter((question) => {
              if (
                config?.sub_question_mapping![
                  user_response[config.question_id] as string
                ]?.includes(question.question_config.question_id)
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
  const handleConfirmSubmit = () => {
    handleSubmit();
    setIsModalOpen(false);
  };
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
          {(loading || _loading || taskLoading) && <PageLoader />}
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
              handleSubmit={() => {
                trigger();
                setIsModalOpen(true);
              }}
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
      {isModalOpen && (
        <Dialog
          open={isModalOpen}
          onOpenChange={(open) => !open && setIsModalOpen(false)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{'Confirmation!'}</DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              <div className="font-bold text-2xl pb-10 text-center">
                Do you want to submit?
              </div>
              {!formState.isValid && (
                <div className="text-red-500 p-2 bg-red-50 rounded-md mb-2">
                  Some fields are required
                </div>
              )}
              <div className="flex space-x-4 justify-around">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleConfirmSubmit}
                  className="px-6 bg-gray-900"
                  disabled={!formState.isValid}
                >
                  Submit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
