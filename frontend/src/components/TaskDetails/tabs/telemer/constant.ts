export const question_Data = [
  {
    section: 'introduction',
    questions: [
      {
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
      },
    ],
  },
  {
    section: 'Demographic details',
    questions: [
      {
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
        members: [
          {
            user_id: 'XTptzh7_EkJeleb5depl9w',
            role: 'proposer',
            created_on: '2025-03-24',
            parameters: {
              name: { value: 'John Doe' },
              id: { value: 'm871z9ugefwfmvbslre' },
            },
          },
          {
            user_id: 'XTptzh7_EkJeleb5depl222',
            role: 'proposer',
            created_on: '2025-03-24',
            parameters: {
              name: { value: 'John Doe' },
              id: { value: 'm871z9ugefwfmvbslre222' },
            },
          },
        ],
      },
      {
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
          question_text: ['Can you please confirm your Date of Birth?'],
          question_id: 'dob_confirmation',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'dob_confirmation',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'height_weight_other',
              question_text: ['Please Specify'],
              question_id: 'height_weight_other',
              type: 'telemer_textarea',
              required: 0,
            },
          ],
          option: [
            {
              capture_text: 0,
              label: 'Correct',
              answer_id: 'correct',
            },
            {
              capture_text: 0,
              label: 'Other',
              answer_id: 'other',
            },
          ],
          question_text: [
            "I'm going to read the Height and Weight details you have filled for all the members. Please let me know if all of those are correct",
          ],
          sub_question_mapping: {
            other: ['height_weight_other'],
          },
          question_id: 'height_weight_confirmation',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'height_weight_confirmation',
      },
    ],
  },
  {
    section: 'Habits',
    questions: [
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'tobacco_quantity',
              question_text: ['Please mention the quantity of smoking/tobacco'],
              question_id: 'tobacco_quantity',
              type: 'telemer_textarea',
              required: 0,
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
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'alcohol_quantity',
              question_text: [
                'Please mention the quantity of alcohol(Mention the number of drinks of Hard liquor or glasses of wine or bottles of beer)',
              ],
              question_id: 'alcohol_quantity',
              type: 'telemer_textarea',
              required: 0,
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
      },
    ],
  },
  {
    section: 'Pre existing conditions',
    questions: [
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'other_medical_conditions',
              question_text: ['Please specify medical conditions'],
              question_id: 'other_medical_conditions',
              type: 'telemer_textarea',
              required: 0,
            },
            {
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
      },
      {
        question_config: {
          sub_questions: [
            {
              sub_questions: [
                {
                  answer_id: 'medicine_reasons_follow_up',
                  question_text: [
                    'pls ask for which health condition are they taking medicine? Pls specify the name and dosage of medicine',
                  ],
                  question_id: 'medicine_reasons_follow_up',
                  type: 'telemer_textarea',
                  required: 0,
                },
              ],
              option: [
                {
                  capture_text: 0,
                  label: 'Fever, Cough, Cold',
                  answer_id: 'fever_cough_covid',
                },
                {
                  capture_text: 0,
                  label: 'COVID-19',
                  answer_id: 'covid_19',
                },
                {
                  capture_text: 0,
                  label: 'Muscle pain',
                  answer_id: 'muscle_pain',
                },
                {
                  capture_text: 0,
                  label: 'Longer term conditions',
                  answer_id: 'long_term_conditions',
                },
                {
                  capture_text: 0,
                  label: 'Other',
                  answer_id: 'other',
                },
              ],
              question_text: ['What were those medicines for?'],
              sub_question_mapping: {
                other: ['medicine_reasons_follow_up'],
              },
              question_id: 'medicine_reasons',
              type: 'telemer_multi_select',
              required: 0,
            },
            {
              sub_questions: [
                {
                  answer_id: 'not_recovered_follow_up',
                  question_text: [
                    'What are the current symptoms? ',
                    'Any ongoing/advised treatment?',
                  ],
                  question_id: 'not_recovered_follow_up',
                  type: 'telemer_textarea',
                  required: 0,
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
              required: 0,
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
          question_text: [
            'Did anyone in this plan take any prescribed medicines in the past week?',
          ],
          sub_question_mapping: {
            yes: ['medicine_reasons', 'recovered_now'],
          },
          question_id: 'prescribed_medicines',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'prescribed_medicines',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'other_symptoms',
              question_text: ['Please specify other symptoms'],
              question_id: 'other_symptoms',
              type: 'telemer_textarea',
              required: 0,
            },
            {
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
            {
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
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'spectacles_follow_up',
              question_text: [
                'What is the type and extent of refractive error and the power of the spectacle lenses being used.',
              ],
              question_id: 'spectacles_follow_up',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: ['Do you currently wear spectacles'],
          sub_question_mapping: {
            yes: ['spectacles_follow_up'],
          },
          question_id: 'spectacles',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'spectacles',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'has_hospitalised_follow_up',
              question_text: [
                '- Past surgery ',
                '1. Year of hospitalisation/surgery ',
                '2. Number of days of hospitalisation ',
                '3. Any complication post surgery/hospitalisation ',
                '4. For how long did you take the treatment for that disease ',
                '5. Any current symptoms/recurrence ',
                '- Advised surgery ',
                '1. What is the diagnosis and duration of illness/probable time of surgery/hospitalisation ',
                '2. When was the last doctor consultation, reports availability- yes/no. ',
                '3. Are there any current symptoms/recurrences?',
              ],
              question_id: 'has_hospitalised_follow_up',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Has anyone in this plan been advised to undergo or has ever undergone hospitalisation for any illness / surgery?',
          ],
          sub_question_mapping: {
            yes: ['has_hospitalised_follow_up'],
          },
          question_id: 'has_hospitalised',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'has_hospitalised',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'cataract_follow_up_1',
              question_text: [
                '1. Thank you for sharing. May I ask which family member is experiencing this issue? ',
                "2. Can you describe the nature of [family member]'s symptoms?",
                '3. When did [the family member] first notice these symptoms, and have they changed over time?',
              ],
              question_id: 'cataract_follow_up_1',
              type: 'telemer_textarea',
              required: 0,
            },
            {
              answer_id: 'cataract_follow_up_2',
              question_text: [
                'Has [the family member] visited a specialist, such as an eye specialist, or ophthalmologist, about this issue? What did they recommend?',
                'a. If medication is suggested - specify the name and dosage of the medicine the family member is taking',
                'b. If surgical/hospitalization is suggested - then type of surgery; if the surgery is done then details of surgery (type, year, etc.)? Is it unilateral or bilateral?',
              ],
              question_id: 'cataract_follow_up_2',
              type: 'telemer_textarea',
              required: 0,
            },
            {
              answer_id: 'cataract_follow_up_3',
              question_text: [
                'Any relevant investigations done- Please specify recent result values within the last 03 months?',
              ],
              question_id: 'cataract_follow_up_3',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Has any member of your family recently experienced any issues related to their eyes, such as blurring or cloudy vision, sensitivity to light, or been diagnosed with cataract?',
          ],
          sub_question_mapping: {
            yes: [
              'cataract_follow_up_1',
              'cataract_follow_up_2',
              'cataract_follow_up_3',
            ],
          },
          question_id: 'cataract',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'cataract',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'spondylopathy_follow_up_1',
              question_text: [
                '1. Thank you for sharing. May I ask which family member is experiencing this issue?',
                "2. Can you describe the nature of [a family member]'s [symptom] and how long have you experienced this? Is the pain constant, or on and off ? Is it worse at certain times of the day, in specific environments, or during particular activities?",
                '3. Is the pain spreading to other areas or just limited to specific parts of the body? If so, where?',
                '4. When did [a family member] first notice these symptoms, and have they changed over time and how long have you been facing this?',
                '5. Has [a family member] visited a specialist, such as an orthopedic doctor, neurologist, physiotherapist, about this issue? Did they do an X-Ray, CT Scan or MRI and when was it?',
              ],
              question_id: 'spondylopathy_follow_up_1',
              type: 'telemer_textarea',
              required: 0,
            },
            {
              answer_id: 'spondylopathy_follow_up_2',
              question_text: [
                'What was the diagnosis and what did they recommend?',
                'a. If medication is suggested - specify the name and dosage of the medicine the family member is taking?',
                'b. If surgical/hospitalization/any other type treatment is suggested - then type of surgery; if the surgery is done then details of surgery (type, year, etc.)?',
                "c. Can you please provide the doctor's name?",
              ],
              question_id: 'spondylopathy_follow_up_2',
              type: 'telemer_textarea',
              required: 0,
            },
            {
              answer_id: 'spondylopathy_follow_up_3',
              question_text: [
                "1. Are there any other symptoms or health concerns [a family member] has discussed with their specialist recently? Can you please provide the doctor's name?",
                '2. Has the <family member> been diagnosed with cervical disc disorder or prolapsed intervertebral disc?',
              ],
              question_id: 'spondylopathy_follow_up_3',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Has any member of your family covered under this plan been experiencing symptoms such as back pain, neck pain, leg pain, or any other type of pain?',
          ],
          sub_question_mapping: {
            yes: [
              'spondylopathy_follow_up_1',
              'spondylopathy_follow_up_2',
              'spondylopathy_follow_up_3',
            ],
          },
          question_id: 'spondylopathy',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'spondylopathy',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'gonarthrosis_follow_up_1',
              question_text: [
                '1. Thank you for sharing. May I ask which family member is experiencing this issue?',
                "2. Can you describe the nature of [family member]'s symptoms and how long have you been facing this?",
                '3. Is the pain constant, or on and off ? Is it worse at certain times of the day, in specific environments, or during particular activities?',
                '4. Is the pain radiating in nature or restricted to only certain areas of the body, if so, where ?',
                '5. When did [a family member] first notice these symptoms, and have they changed over time?',
                '6. Has [a family member] visited a specialist, such as an orthopedic doctor, neurologist, physiotherapist, about this issue? Did they do an X-Ray, CT Scan or MRI?  If yes, when was it taken and can you share those?',
              ],
              question_id: 'gonarthrosis_follow_up_1',
              type: 'telemer_textarea',
              required: 0,
            },
            {
              answer_id: 'gonarthrosis_follow_up_2',
              question_text: [
                'What was the diagnosis and what did they recommend?',
                'a. If medication is suggested - specify the name and dosage of the medicine the family member is taking?',
                'b. If surgical/hospitalization is suggested - then type of surgery; if the surgery is done then details of surgery (type, year, etc.)?',
                "c. Can you please provide the doctor's name?",
              ],
              question_id: 'gonarthrosis_follow_up_2',
              type: 'telemer_textarea',
              required: 0,
            },
            {
              answer_id: 'gonarthrosis_follow_up_3',
              question_text: [
                'Are there any other symptoms or health concerns [a family member] has discussed with their specialist recently?',
              ],
              question_id: 'gonarthrosis_follow_up_3',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Has any member of your family covered under this plan been experiencing knee/joint pain or advised by a Doctor for any surgery?',
          ],
          sub_question_mapping: {
            yes: [
              'gonarthrosis_follow_up_1',
              'gonarthrosis_follow_up_2',
              'gonarthrosis_follow_up_3',
            ],
          },
          question_id: 'gonarthrosis',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'gonarthrosis',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'sinusitis_follow_up_1',
              question_text: [
                '1. Thank you for sharing. May I ask which family member is experiencing this issue?',
                "2. Can you describe the nature of [family member]'s symptoms and how long have you facing this?",
                '3. Is it recurring or the first time have you experienced this?',
                '4. Has [a family member] visited a specialist/ENT Doctor, about this issue? Did they do any kind of tests like CT/MRI or nasal endoscopy? If yes, when was it taken and can you share those?',
              ],
              question_id: 'sinusitis_follow_up_1',
              type: 'telemer_textarea',
              required: 0,
            },
            {
              answer_id: 'sinusitis_follow_up_2',
              question_text: [
                'What was the exact diagnosis and what did they recommend?',
                'a. If medication is suggested - specify the name and dosage of the medicine the family member is taking?',
                'b. If surgical/hospitalization/ potential treatments is suggested - then type of surgery; if the surgery is done then details of surgery (type, year, etc.)?',
                "c. Can you please provide the doctor's name?",
              ],
              question_id: 'sinusitis_follow_up_2',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Has any member of your family covered under this plan been experiencing frequent sneezing/cold, headache or snoring or sinus?',
          ],
          sub_question_mapping: {
            yes: ['sinusitis_follow_up_1', 'sinusitis_follow_up_2'],
          },
          question_id: 'sinusitis',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'sinusitis',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'hernia_follow_up_1',
              question_text: [
                '1. Thank you for sharing. May I ask which family member is experiencing this issue?',
                "2. Can you describe the nature of [family member]'s symptoms?",
                '3. How long has [a family member] been experiencing this [symptom]?',
                '4. Is it recurring or the first time have you experienced this ?',
                '5. Has [a family member] visited a specialist about this issue? Did they do any kind of tests like USG or any other test? If yes, when was it taken and can you share those?',
              ],
              question_id: 'hernia_follow_up_1',
              type: 'telemer_textarea',
              required: 0,
            },
            {
              answer_id: 'hernia_follow_up_2',
              question_text: [
                'What was the exact diagnosis and what did they recommend?',
                'a. If medication is suggested - specify the name and dosage of the medicine the family member is taking?',
                'b. If surgical/hospitalization/ potential treatments are suggested - then type of surgery; if the surgery is done then details of surgery (type, year, etc.)?',
              ],
              question_id: 'hernia_follow_up_2',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Has any member of your family covered under this plan been diagnosed with hernia or awaiting consultation for hernia?',
          ],
          sub_question_mapping: {
            yes: ['hernia_follow_up_1', 'hernia_follow_up_2'],
          },
          question_id: 'hernia',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'hernia',
      },
      {
        question_config: {
          answer_id: 'gynaecological_heads_up',
          question_text: [
            'Heads up before asking Gynaecological Question --',
            'Next, we need to ask some questions regarding <women member name> health, including any gynaecological history, for the female members in your policy. Are you comfortable sharing this information for the female members covered in your application?',
            '<Pause for an answer, and if a customer says no, then>',
            'Ok, No problem. Could you please pass the phone to <your daughter/wife/mother/mother-in-law> or provide her contact information?',
            '<Pause for an answer, and if a customer says no and asks to call later as they are not available at that time, then>',
            "Sure, that's not a problem at all. We can schedule the call for a time that suits you or your < daughter/wife/mother/mother-in-law> better. Please let me know when would be a convenient time for you, or if you prefer, you can share their contact details and a suitable time for me to call directly.",
            '<Pause for an answer, and if a customer says yes, then> ask the questions',
          ],
          question_id: 'gynaecological_heads_up',
          order: 1090,
          type: 'telemer_info',
          required: 0,
        },
        question_id: 'gynaecological_heads_up',
      },
      {
        question_config: {
          sub_questions: [
            {
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
            {
              answer_id: 'pregnant_follow_up',
              question_text: [
                '1. Any complications related to pregnancy ',
                '2.Current medications (for complaints like- Gestational Diabetes, hypertension, thyroid)',
              ],
              question_id: 'pregnant_follow_up',
              type: 'telemer_textarea',
              required: 0,
            },
            {
              answer_id: 'past_pregnant',
              question_text: [
                '- Were you or your spouse pregnant in the past?',
                '- Please provide your pregnancy details if any/ is there any history of miscarriage or abortion?',
              ],
              question_id: 'past_pregnant',
              type: 'telemer_textarea',
              required: 0,
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
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'gynaecological_conditions_follow_up',
              question_text: [
                '- What is the duration of illness , any doctor consultation done or not? ',
                '- Is there any hospitalisation history? ',
                '- Any relevant investigations (like USG , PAP smear , mammogram , biopsy reports etc) done or not? ',
                '- Mention the medications details (if any ) ',
                '- Are there any current symptoms/recurrences? (recovered or not or still on medications) ',
                '- When was the last doctor consultation done, reports availability- yes/no?',
              ],
              question_id: 'gynaecological_conditions_follow_up',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Has anyone in this plan suffered or is suffering from any gynaecological complaints like any menstrual complaints,  breast lump, Fibroid uterus, endometriosis, or undergone any surgery?',
          ],
          sub_question_mapping: {
            yes: ['gynaecological_conditions_follow_up'],
          },
          question_id: 'gynaecological_conditions',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'gynaecological_conditions',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'explain_health',
              question_text: ['Explain the health issues or symptoms'],
              question_id: 'explain_health',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Does anyone in this plan have any other ongoing health issues or symptoms for which you are planning a doctor visit?',
          ],
          sub_question_mapping: {
            yes: ['explain_health'],
          },
          question_id: 'plan_doctor_visit',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'plan_doctor_visit',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'insurance_history_follow_up',
              question_text: [
                "Details about Policy rejection, withdrawal etc? Please don't ask this question yourself. Only fill in the details if customer is willingly providing details.",
              ],
              question_id: 'insurance_history_follow_up',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Has any proposal for your health insurance ever been declined, postponed, withdrawn or accepted at an increased premium, special terms or with reduced cover?',
          ],
          sub_question_mapping: {
            yes: ['insurance_history_follow_up'],
          },
          question_id: 'insurance_history',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'insurance_history',
      },
      {
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
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'health_checkups_follow_up',
              question_text: [
                'Which member, when was the test done, how were the reports (Normal or not)? Can you pls share the reports with us on health@acko.com? Please mention your registered phone number in the email',
              ],
              question_id: 'health_checkups_follow_up',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Have you or anyone else covered in this plan undergone any health checkups in the past?',
          ],
          sub_question_mapping: {
            yes: ['health_checkups_follow_up'],
          },
          question_id: 'health_checkups',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'health_checkups',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'claim_history_follow_up',
              question_text: ['Please provide details'],
              question_id: 'claim_history_follow_up',
              type: 'telemer_textarea',
              required: 0,
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
          question_text: [
            'Have you ever claimed any health insurance in the last 05 years (corporate or other insurance)',
          ],
          sub_question_mapping: {
            yes: ['claim_history_follow_up'],
          },
          question_id: 'claim_history',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'claim_history',
      },
      {
        question_config: {
          answer_id: 'member_comments',
          question_text: [],
          question_id: 'member_comments',
          type: 'members_comments',
          required: 1,
        },
        question_id: 'member_comments',
      },
      {
        question_config: {
          answer_id: 'doctor_remark',
          question_text: ["Doctor's Final Remark"],
          question_id: 'doctor_remark',
          type: 'telemer_textarea',
          required: 0,
        },
        question_id: 'doctor_remark',
      },
      {
        question_config: {
          answer_id: 'call_id',
          question_text: ['Teckinfo Call ID'],
          question_id: 'call_id',
          type: 'telemer_textarea',
          required: 1,
        },
        question_id: 'call_id',
      },
      {
        question_config: {
          answer_id: 'additional_telemer_question',
          question_text: [],
          question_id: 'additional_telemer_question',
          order: 2000,
          type: 'telemer_additional_question',
          required: 0,
        },
        question_id: 'additional_telemer_question',
      },
      {
        question_config: {
          question_id: 'declaration',
          question_text: [
            'Closing statement after asking all tele-mer questions -- ',
            "We've completed this step of your health evaluation. Before we conclude, please confirm that you've understood and provided accurate information to the best of your knowledge?",
            '<Pause for an answer>',
            '<If customer confirms>',
            'Thank you for sharing all the necessary details! Let me guide you through the next steps.',
            '<Have the following information handy - Product - Platinum/Standard/ASP, Plan - Base/Top-up, Porting - Yes/No, Fresh/Renewal>',
            'Add-Info and PPMC',
            '<If you anticipate any add-info requests based on customer declaration + PPMC for all adults>',
            'Thank you for sharing all the necessary details! Let me guide you through the next steps of the health evaluation process.',
            "As mentioned that you or your family member, <member>, have a <PED/medical condition>. To better understand the health condition, we'll need some related documents such as <consultation paper/discharge summary/etc). Do you have these documents available?",
            '<If a customer says yes, the documents are available>',
            "Great! We'll inform you through email and WhatsApp about the specific medical documents needed within the next 1-2 days. You can upload the documents through the Acko app and track the progress of your health evaluation process by logging in with your registered mobile number.",
            '<If a customer says I don’t know, I need to look for it>',
            "No problem! Just try to find all the documents related to <PED disclosed> for <member> and keep them ready. We'll inform you through email and WhatsApp about the specific medical documents needed within the next 1-2 days.  You can upload the documents through the Acko app and track the progress of your health evaluation process by logging in with your registered mobile number.",
            '<If customer say no> ',
            "Ok, no problem.I'll let our team know you don't have the documents. We might need you to visit a doctor to get a consultation report, but please double-check if you can find the documents to speed up the process. Once you upload all the required documents, we'll proceed with the health evaluation within 1-2 days, including medical tests for all family members over 18. ACKO will cover the test costs, so there's no need to worry.",
            '< If lab test> You will need to have ultrasounds of the abdomen & pelvis area, blood and urine tests, and a treadmill test (also known as TMT). The TMT involves running on a treadmill for a few minutes, so we recommend wearing sports shoes. Please confirm if you and your family members are comfortable with undergoing these tests at the lab. ',
            '<If a member is pregnant or has certain medical defined by the UWs or is not comfortable with getting the TMT done> ',
            "Since you've mentioned that you or your <wife/father/mother/mother-in-law/father-in-law/son/daughter> is/are pregnant/has <health issues>/not comfortable, you/he/she can skip the TMT and instead get a 2D echo and ECG done. These tests are safe, but if you have any concerns, feel free to discuss them with your gynecologist/doctor.",
            "<If home test> You'll only need to have a blood and urine test done. ",
            "We'll send you an email and a WhatsApp message within 1-2 days once we start this process. You'll find an option in the app to schedule your medical test. Please book the test as soon as possible so we can finish this process quickly and move towards the end of the health evaluation process.",
            '<If you don’t anticipate any add-info requests and no PPMC>',
            'Thank you for sharing all the necessary details! ',
            "Our team will take around 1 to 2 days to review it, and then we'll update you on the next steps for the health evaluation process. You can track the progress by logging into the Acko app with your registered mobile number.",
            '<If only PPMC is required and no add-info>',
            'Thank you for sharing all the necessary details! ',
            'For platinum',
            "The next step of your health evaluation is getting the medical test done either at a lab/at home for all family members who are over 18 years old. ACKO will cover the cost of the test, so there's no need to worry about that.",
            '< If lab test> You will need to have ultrasounds of the abdomen & pelvis area, blood and urine tests, and a treadmill test (also known as TMT). The TMT involves running on a treadmill for a few minutes, so we recommend wearing sports shoes. Please confirm if you and your family members are comfortable with undergoing these tests at the lab. ',
            '<If a member is pregnant or has certain medical defined by the UWs or is not comfortable with getting the TMT done> ',
            "Since you've mentioned that you or your <wife/father/mother/mother-in-law/father-in-law/son/daughter> is/are pregnant/has <health issues>/not comfortable, you/he/she can skip the TMT and instead get a 2D echo and ECG done. These tests are safe, but if you have any concerns, feel free to discuss them with your gynecologist/doctor.",
            "<If home test> You'll only need to have a blood and urine test done. ",
            '<If customer confirms that he/she is comfortable with the tests>',
            "We'll send you an email and a WhatsApp message within 1-2 days once we start this process. You'll find an option in the app to schedule your medical test. Please book the test as soon as possible so we can finish this process quickly and move towards the end of the health evaluation process.",
            'For standard/platinum top-up',
            'If there are any family members above 41years (for top-up) and 66 years old (for base):',
            'Thank you for sharing all the necessary details! ',
            "The next step of your health evaluation is getting the medical test done either at a lab/at home for all family members who are over 66 years old. ACKO will cover the cost of the test, so there's no need to worry about that.",
            '< If lab test> You will need to have ultrasounds of the abdomen & pelvis area, blood and urine tests, and a treadmill test (also known as TMT). The TMT involves running on a treadmill for a few minutes, so we recommend wearing sports shoes. Please confirm if you and your family members are comfortable with undergoing these tests at the lab. ',
            '<If a member is pregnant or has certain medical defined by the UWs or is not comfortable with getting the TMT done> ',
            "Since you've mentioned that you or your <wife/father/mother/mother-in-law/father-in-law/son/daughter> is/are pregnant/has <health issues>/not comfortable, you/he/she can skip the TMT and instead get a 2D echo and ECG done.",
            "<If home test> You'll only need to have a blood and urine test done. ",
            '<If customer confirms that he/she comfortable with the tests>',
            "We'll send you an email and a WhatsApp message within 1-2 days once we start this process. You'll find an option in the app to schedule your medical test. Please book the test as soon as possible so we can finish this process quickly and move towards the end of the health evaluation process.",
            'If none of the family members are above 66 years old:',
            'Thank you for sharing all the necessary details! ',
            "Our team will take around 1 to 2 days to review it and then we'll update you on the next steps for the health evaluation process. You can track the progress by logging into the Acko app with your registered mobile number.",
            'Add-Info and no PPMC',
            '<If you anticipate any add-info requests based on customer declaration and no PPMC>',
            'Thank you for sharing all the necessary details! Let me guide you through the next steps of the health evaluation process.',
            "As mentioned that you or your family member, <member>, have a <PED/medical condition>. To better understand the health condition, we'll need some related documents such as <consultation paper/discharge summary/etc). Do you have these documents available?",
            '<If a customer says yes, the documents are available>',
            "Great! We'll inform you through email and WhatsApp about the specific medical documents needed within the next 1-2 days.  You can upload the documents through the Acko app and track the progress of your health evaluation process by logging in with your registered mobile number.",
            '<If a customer says I don’t know,I need to look for it>',
            "No problem! Just try to find all the documents related to <PED disclosed> for <member> and keep them ready. We'll inform you through email and WhatsApp about the specific medical documents needed within the next 1-2 days.  You can upload the documents through the Acko app and track the progress of your health evaluation process by logging in with your registered mobile number.",
            '<If customer say no> ',
            "Ok, no problem. We'll let our team know that you don't have the documents and figure out the best way forward. Just to let you know, since you don't have the documents, we might suggest visiting a doctor to get a consultation report and submit it. However, please check once again if you can find the related documents so we can speed up the health evaluation process.",
            'Porting customers',
            '<Port - Talk about this only if the customer ports to Acko. >',
            'We are prioritising your request to ensure there is seamless coverage. I would also like to inform you that you have a 30-day grace period after your current plan expires to renew it. ',
            'Feel free to reach out to us on our toll-free numbers if you have any questions. Have a fantastic day!',
          ],
          required: 0,
          type: 'telemer_info',
        },
        question_id: 'declaration',
      },
    ],
  },
];
