export const question_Data4 = [
  {
    section: 'introduction',
    question_config: {
      answer_id: 'introduction',
      question_text: [
        'Tele-mer Script',
        'Opening Script --',
        "Hi, I'm Dr. [Your Name] from Acko Health Insurance. Thank you for choosing us / Thank you for choosing us to port your existing policy.",
        'This call is regarding the first step of your health evaluation process, which begins with answering some health-related questions about each family member in the application.',
        'The process should take 15-20 minutes to complete.Is now a good time to talk?',
        '[If the customer denies]—We can arrange the call for a time that works better for you. When would be convenient for you?  ',
        '[If the customer agrees to talk]',
        'I want to inform you that this call will be recorded to ensure accuracy and help us enhance our service. Rest assured, your privacy is of utmost importance to us, and we will keep all the shared information strictly confidential.',
        "It's important to share health-related information about you and your family members as accurately as possible to the best of your knowledge, even if there are uncertainties or things you're not entirely sure about. Please remember that if we discover any medical conditions for you or your family members after issuing the policy that was known and not disclosed earlier, it could affect your claim settlement process or even lead to cancelling the policy without a refund. Plus, the more we know about your health, the better we can customise your insurance to fit your needs perfectly.",
        'So, shall we get started?',
      ],
      question_id: 'introduction',
      type: 'telemer_info',
      required: 0,
    },
    question_id: 'introduction',
    eligible_members: [
      {
        user_id: '1',
        name: 'Rahul',
      },
      {
        user_id: '2',
        name: 'Smita',
      },
    ],
  },
  {
    section: 'Demographic details',
    question_config: {
      option: [
        {
          capture_text: 0,
          label: 'Correct',
          answer_id: 'correct',
        },
        {
          capture_text: 0,
          label: 'Incorrect',
          answer_id: 'incorrect',
        },
      ],
      question_text: ['Can you please confirm your name?'],
      question_id: 'name_confirmation',
      type: 'telemer_radio_group',
      required: 1,
    },
    question_id: 'name_confirmation',
    eligible_members: [
      {
        user_id: '1',
        name: 'Rahul',
      },
      {
        user_id: '2',
        name: 'Smita',
      },
    ],
  },
  {
    section: 'Demographic details',
    question_config: {
      answer_id: 'health_and_habits',
      question_text: [
        'Is there anything else you would like to share with us with respect to your health or habits?',
      ],
      question_id: 'health_and_habits',
      type: 'telemer_textarea',
      required: 1,
    },
    question_id: 'health_and_habits',
    eligible_members: [
      {
        user_id: '1',
        name: 'Rahul',
      },
      {
        user_id: '2',
        name: 'Smita',
      },
    ],
  },
  {
    section: 'Habits',
    question_config: {
      sub_questions: [
        {
          section: 'Habits',
          question_id: 'tobacco_quantity',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'tobacco_quantity',
            question_text: ['Please mention the quantity of smoking/tobacco'],
            question_id: 'tobacco_quantity',
            type: 'telemer_textarea',
            required: 0,
          },
        },
      ],
      option: [
        {
          capture_text: 0,
          label: 'No',
          answer_id: 'no',
        },
        {
          capture_text: 0,
          label: 'Yes, everyday',
          answer_id: 'everyday',
        },
        {
          capture_text: 0,
          label: 'Yes, atleast 3-4 times a week',
          answer_id: 'weekly',
        },
        {
          capture_text: 0,
          label: 'Yes, a few times a year',
          answer_id: 'yearly',
        },
      ],
      question_text: [
        'Has anyone covered in this plan smoked or chewed tobacco in the past year?',
      ],
      sub_question_mapping: {
        everyday: ['tobacco_quantity'],
      },
      question_id: 'tobacco',
      type: 'telemer_radio_group',
      required: 1,
    },
    question_id: 'tobacco',
    eligible_members: [
      {
        user_id: '1',
        name: 'Rahul',
      },
      {
        user_id: '2',
        name: 'Smita',
      },
    ],
  },
  {
    section: 'Habits',
    question_config: {
      sub_questions: [
        {
          section: 'Habits',
          question_id: 'alcohol_quantity',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'alcohol_quantity',
            question_text: [
              'Please mention the quantity of alcohol(Mention the number of drinks of Hard liquor or glasses of wine or bottles of beer)',
            ],
            question_id: 'alcohol_quantity',
            type: 'telemer_textarea',
            required: 0,
          },
        },
      ],
      option: [
        {
          capture_text: 0,
          label: 'No',
          answer_id: 'no',
        },
        {
          capture_text: 0,
          label: 'Yes, everyday',
          answer_id: 'everyday',
        },
        {
          capture_text: 0,
          label: 'Yes, atleast 3-4 times a week',
          answer_id: 'weekly',
        },
        {
          capture_text: 0,
          label: 'Yes, a few times a year',
          answer_id: 'yearly',
        },
      ],
      question_text: [
        'Has anyone covered in this plan consumed alcohol in the past year?',
      ],
      sub_question_mapping: {
        everyday: ['alcohol_quantity'],
        weekly: ['alcohol_quantity'],
      },
      question_id: 'alcohol',
      type: 'telemer_radio_group',
      required: 1,
    },
    question_id: 'alcohol',
    eligible_members: [
      {
        user_id: '1',
        name: 'Rahul',
      },
      {
        user_id: '2',
        name: 'Smita',
      },
    ],
  },
  {
    section: 'Pre existing conditions',
    question_config: {
      sub_questions: [
        {
          section: 'Pre existing conditions',
          question_id: 'other_medical_conditions',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'other_medical_conditions',
            question_text: ['Please specify medical conditions'],
            question_id: 'other_medical_conditions',
            type: 'telemer_textarea',
            required: 0,
          },
        },
        {
          section: 'Pre existing conditions',
          question_id: 'medical_condition_follow_up',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'medical_condition_follow_up',
            question_text: [
              'a. When was it diagnosed? ',
              'b. What is the treatment given-medical/surgical/hospitalisation ',
              'c. If any member is takes medication - specify the name and dosage of medicine ',
              'd. If any member has been through surgical procedure/hospitalisation- Year of surgery/other details ',
              'e. Any ongoing symptoms for which the treatment is being continued- Yes/No, IF Yes- Probe on details ',
              'f. When was the treatment completed and when was the last consultation for the medical condition ',
              'g. Any reoccurrence or complication? ',
              'h. Any relevant investigations done- Please specify recent result values within the last 03 months? ',
              'i. Any other symptom(s) which are there awaiting doctor consultation?',
            ],
            question_id: 'medical_condition_follow_up',
            type: 'telemer_textarea',
            required: 0,
          },
        },
      ],
      option: [
        {
          capture_text: 0,
          label: 'Vitamin deficiency',
          answer_id: 'vitamin_deficiency',
        },
        {
          capture_text: 0,
          label: 'Asthma / Other Respiratory Disorder',
          answer_id: 'asthma',
        },
        {
          capture_text: 0,
          label: 'Hypothyroid / Hyperthyroid',
          answer_id: 'thyroid',
        },
        {
          capture_text: 0,
          label: 'High blood pressure',
          answer_id: 'high_bp',
        },
        {
          capture_text: 0,
          label: 'Heart disease',
          answer_id: 'heart_disease',
        },
        {
          capture_text: 0,
          label: 'Diabetes',
          answer_id: 'diabetes',
        },
        {
          capture_text: 0,
          label: 'Other medical condition',
          answer_id: 'other',
        },
        {
          capture_text: 0,
          label: 'No medical conditions',
          answer_id: 'none',
        },
      ],
      question_text: [
        'Has anyone in this plan been diagnosed with a medical condition?',
      ],
      sub_question_mapping: {
        heart_disease: ['medical_condition_follow_up'],
        diabetes: ['medical_condition_follow_up'],
        asthma: ['medical_condition_follow_up'],
        high_bp: ['medical_condition_follow_up'],
        thyroid: ['medical_condition_follow_up'],
        vitamin_deficiency: ['medical_condition_follow_up'],
        other: ['medical_condition_follow_up', 'other_medical_conditions'],
      },
      question_id: 'medical_condition',
      order: 700,
      type: 'telemer_multi_select',
      required: 1,
    },
    question_id: 'medical_condition',
    eligible_members: [
      {
        user_id: '1',
        name: 'Rahul',
      },
      {
        user_id: '2',
        name: 'Smita',
      },
    ],
  },
  {
    section: 'Pre existing conditions',
    question_config: {
      sub_questions: [
        {
          section: 'Pre existing conditions',
          question_id: 'medicine_reasons',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'medicine_reasons_follow_up',
            question_text: [
              'pls ask for which health condition are they taking medicine? Pls specify the name and dosage of medicine',
            ],
            question_id: 'medicine_reasons_follow_up',
            type: 'telemer_textarea',
            required: 0,
          },
        },
        {
          section: 'Pre existing conditions',
          question_id: 'not_recovered_follow_up',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'not_recovered_follow_up',
            question_text: [
              'What are the current symptoms? ',
              'Any ongoing/advised treatment?',
            ],
            question_id: 'not_recovered_follow_up',
            type: 'telemer_textarea',
            required: 0,
            eligible_members: [
              {
                user_id: '1',
                name: 'Rahul',
              },
              {
                user_id: '2',
                name: 'Smita',
              },
            ],
          },
        },
      ],
      option: [
        {
          capture_text: 0,
          label: 'Yes',
          answer_id: 'yes',
        },
        {
          capture_text: 0,
          label: 'No',
          answer_id: 'no',
        },
      ],
      question_text: ['Have they recovered now?'],
      sub_question_mapping: {
        no: ['not_recovered_follow_up'],
      },
      question_id: 'recovered_now',
      type: 'telemer_radio_group',
      required: 1,
    },
    eligible_members: [
      {
        user_id: '1',
        name: 'Rahul',
      },
      {
        user_id: '2',
        name: 'Smita',
      },
    ],
    question_id: 'recovered_now',
  },

  {
    section: 'Pre existing conditions',
    question_config: {
      sub_questions: [
        {
          section: 'Pre existing conditions',
          question_id: 'other_symptoms',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'other_symptoms',
            question_text: ['Please specify other symptoms'],
            question_id: 'other_symptoms',
            type: 'telemer_textarea',
            required: 0,
          },
        },
        {
          section: 'Pre existing conditions',
          question_id: 'experiencing_symptoms_follow_up',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'experiencing_symptoms_follow_up',
            question_text: [
              '- Are you currently taking any medicines? ',
              '- Have you consulted any doctor? ',
              '- Probe on details (Duration/ongoing medications/hospitalisation/present symptoms/last consultation/reports/complication and recurrence)',
              '- If not, are you planning to visit any doctor?',
            ],
            question_id: 'experiencing_symptoms_follow_up',
            type: 'telemer_textarea',
            required: 0,
          },
        },
        {
          section: 'Pre existing conditions',
          question_id: 'experiencing_symptoms_joint_pain',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'experiencing_symptoms_joint_pain',
            question_text: [
              'if joint pain: ',
              '- What is the duration of illness and diagnosis (If arthritis, which type of arthritis). ',
              '- Is there any complaint of  Morning stiffness (if yes- ask duration of stiffness) ',
              '- When was the last doctor consultation, reports availability- yes/no. ',
              '- Any relevant investigations done like X Ray, RA factor, ESR,CRP, uric acid blood test etc )? ',
              '- Are there any difficulties in carrying out day to day activities or  any restriction in range of movement? ',
              '- What are the current symptoms, (if no current symptoms - when was the last episode )',
            ],
            question_id: 'experiencing_symptoms_joint_pain',
            type: 'telemer_textarea',
            required: 0,
          },
        },
      ],
      option: [
        {
          capture_text: 0,
          label: 'Pain (Chest, abdomen, joints or muscles)',
          answer_id: 'pain',
        },
        {
          capture_text: 0,
          label: 'Fatigue',
          answer_id: 'fatigue',
        },
        {
          capture_text: 0,
          label: 'Unexplained weight loss',
          answer_id: 'weight_loss',
        },
        {
          capture_text: 0,
          label: 'Dizziness',
          answer_id: 'dizziness',
        },
        {
          capture_text: 0,
          label: 'Change in bowel habit',
          answer_id: 'bowel',
        },
        {
          capture_text: 0,
          label: 'Difficulty in breathing',
          answer_id: 'breathing',
        },
        {
          capture_text: 0,
          label: 'Acidity / Bleeding / Pain in passing stool',
          answer_id: 'stool',
        },
        {
          capture_text: 0,
          label:
            ' Any complaint related to eye-like blurring of vision / cataract / ear / mouth / nose / throat',
          answer_id: 'ent_complaint',
        },
        {
          capture_text: 0,
          label: 'Any lump / cyst / nodule in the body',
          answer_id: 'lump_cyst_nodule',
        },
        {
          capture_text: 0,
          label: 'Other',
          answer_id: 'other',
        },
        {
          capture_text: 0,
          label: 'No symptoms',
          answer_id: 'none',
        },
      ],
      question_text: [
        'Is anyone in this plan currently experiencing any of the following symptoms?',
      ],
      sub_question_mapping: {
        dizziness: ['experiencing_symptoms_follow_up'],
        weight_loss: ['experiencing_symptoms_follow_up'],
        fatigue: ['experiencing_symptoms_follow_up'],
        bowel: ['experiencing_symptoms_follow_up'],
        breathing: ['experiencing_symptoms_follow_up'],
        stool: ['experiencing_symptoms_follow_up'],
        pain: [
          'experiencing_symptoms_follow_up',
          'experiencing_symptoms_joint_pain',
        ],
        other: ['experiencing_symptoms_follow_up', 'other_symptoms'],
        lump_cyst_nodule: ['experiencing_symptoms_follow_up'],
        ent_complaint: ['experiencing_symptoms_follow_up'],
      },
      question_id: 'experiencing_symptoms',
      type: 'telemer_multi_select',
      required: 1,
    },
    question_id: 'experiencing_symptoms',
    eligible_members: [
      {
        user_id: '1',
        name: 'Rahul',
      },
      {
        user_id: '2',
        name: 'Smita',
      },
    ],
  },

  {
    section: 'Pre existing conditions',
    question_config: {
      sub_questions: [
        {
          section: 'Pre existing conditions',
          question_id: 'baby_due',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            option: [
              {
                capture_text: 0,
                label: '1-3 months',
                answer_id: '1_3_months',
              },
              {
                capture_text: 0,
                label: '3-6 months',
                answer_id: '3_6_months',
              },
              {
                capture_text: 0,
                label: '6-9 month',
                answer_id: '6_9_months',
              },
            ],
            question_text: ['Congratulations! When is the baby due?'],
            question_id: 'baby_due',
            type: 'telemer_radio_group',
            required: 1,
          },
        },
        {
          section: 'Pre existing conditions',
          question_id: 'pregnant_follow_up',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'pregnant_follow_up',
            question_text: [
              '1. Any complications related to pregnancy ',
              '2.Current medications (for complaints like- Gestational Diabetes, hypertension, thyroid)',
            ],
            question_id: 'pregnant_follow_up',
            type: 'telemer_textarea',
            required: 0,
          },
        },
        {
          section: 'Pre existing conditions',
          question_id: 'past_pregnant',
          eligible_members: [
            {
              user_id: '1',
              name: 'Rahul',
            },
            {
              user_id: '2',
              name: 'Smita',
            },
          ],
          question_config: {
            answer_id: 'past_pregnant',
            question_text: [
              '- Were you or your spouse pregnant in the past?',
              '- Please provide your pregnancy details if any/ is there any history of miscarriage or abortion?',
            ],
            question_id: 'past_pregnant',
            type: 'telemer_textarea',
            required: 0,
          },
        },
      ],
      option: [
        {
          capture_text: 0,
          label: 'Yes',
          answer_id: 'yes',
        },
        {
          capture_text: 0,
          label: 'No',
          answer_id: 'no',
        },
      ],
      question_text: ['Are you or your spouse pregnant?'],
      sub_question_mapping: {
        no: ['past_pregnant'],
        yes: ['baby_due', 'pregnant_follow_up'],
      },
      question_id: 'pregnant',
      type: 'telemer_radio_group',
      required: 1,
    },
    question_id: 'pregnant',
    eligible_members: [
      {
        user_id: '1',
        name: 'Rahul',
      },
      {
        user_id: '2',
        name: 'Smita',
      },
    ],
  },
];

export type QuestionConfig = {
  answer_id?: string;
  question_text: string[];
  question_id: string;
  type: string;
  required: number;
  option?: {
    capture_text: number;
    label: string;
    answer_id: string;
  }[];
  sub_questions?: QuestionConfig[];
  sub_question_mapping?: { [key: string]: string[] };
  order?: number;
};

export type EligibleMember = {
  user_id: string;
  name: string;
};

type QuestionData = {
  section: string;
  question_config: QuestionConfig;
  question_id: string;
  eligible_members: EligibleMember[];
};

export type QuestionData4 = QuestionData[];
