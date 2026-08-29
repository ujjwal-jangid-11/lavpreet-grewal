const studyMaterial = [
  {
    id: 1,
    semester: "Semester 1",
    folder: "semester1",

    subjects: [
      {
        id: 1,
        name: "BNS / IPC",
        folder: "bns",

        resources: {
          notes: [
            {
              id: 1,
              title: "BNS / IPC Notes",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20spare%20material/BNS-notes.pdf",
            },
            {
              id: 2,
              title: "BNS / IPC Notes Handwritten Notes",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%201%20pyq/IPC.pdf",
            },
            {
              id: 3,
              title: "BNS / IPC PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20spare%20material/1st%20sem%20pyqs%20analysis_cropped-4.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "Bharatiya Nyaya Sanhita, 2023",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bns2023.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "Law of Crimes-I, BNS, 2023",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%201/Law%20of%20Crimes-1%20BNS%202025.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "IPC / BNS PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%201%20pyq/ipc-bns%20PYQ%20uncropped_cropped.pdf",
            },
          ],

          dukki: [],

          rti: [
            {
              id: 1,
              title: "Law of Crimes-I, BNS, RTI Answer Sheets",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20rtis/bns%20law%20copy%20.pdf",
            },
          ],
        },
      },

      {
        id: 2,
        name: "Law of Contract",
        folder: "contract",

        resources: {
          notes: [
            {
              id: 1,
              title: "Contract Law Notes",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%201/Contract%20notes.pdf",
            },
            {
              id: 2,
              title: "RK Bangia Contract Law",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/Dukki/RK-Bangia-Contract-Law.pdf",
            },
            {
              id: 3,
              title: "Contract Law PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20spare%20material/1st%20sem%20pyqs%20analysis_cropped-1.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Indian Contract Act, 1872",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/contrac-law-bare-act.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "Principles of Contract",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%201/Ist%20Term_Law%20of%20Contract_LB102_2023.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "Principles of Contract PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%201%20pyq/Contarct%20Law%20PYQ%20uncompressed.pdf",
            },
          ],

          dukki: [],

          rti: [
            {
              id: 1,
              title: "Principles of Contract RTI Answer Sheets",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20rtis/contract%20copy%20law%20.pdf",
            },
          ],
        },
      },

      {
        id: 3,
        name: "Family Law I",
        folder: "family1",

        resources: {
          notes: [
            {
              id: 1,
              title: "Family Law 1 PYQs Summary",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20spare%20material/1st%20sem%20pyqs%20analysis_cropped-5.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Dissolution of Muslim Marriages Act, 1939",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/dissolution-of-muslim-marriage-act-1939.pdf",
            },
            {
              id: 2,
              title: "The Hindu Adoptions and Maintenance Act, 1965",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/hindu-adoptions-and-maintenance-act-1965.pdf",
            },
            {
              id: 3,
              title: "The Hindu Marriage Act, 1955",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/hindu-marriage-act.pdf",
            },
            {
              id: 4,
              title: "The Hindu Minority and Guardianship Act, 1956",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/hindu-minority-and-guardianship-act.pdf",
            },
          ],

          casemat: [
            {
              id: 4,
              title: "Family Law 1",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%201/Ist%20Term_Family%20Law-%20I_LB105_2023.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "Family Law 1 PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%201%20pyq/Family%20Law-1%20PYQ%20uncompressed.pdf",
            },
          ],

          dukki: [],

          rti: [
            {
              id: 1,
              title: "Family Law 1 RTI Answer Sheets",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20rtis/family%20law%20copy%20pdf.pdf",
            },
          ],
        },
      },

      {
        id: 4,
        name: "Jurisprudence",
        folder: "jurisprudence",

        resources: {
          notes: [
            {
              id: 1,
              title: "Jurisprudence Notes",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%201/Jurisprudence%20notes%20(1).pdf",
            },
            {
              id: 2,
              title: "Jurisprudence-1 PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20spare%20material/1st%20sem%20pyqs%20analysis_cropped-2.pdf",
            },
          ],

          bareacts: [],

          casemat: [
            {
              id: 1,
              title: "Jurisprudence-I",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%201/JURISPRUDENCE-ILegalMethodCourseCode_LB-1061stsemesterLLB.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "Jurisprudence-I PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%201%20pyq/Jurisprudence%20PYQ%20uncompressed.pdf",
            },
          ],

          dukki: [],

          rti: [
            {
              id: 1,
              title: "Jurisprudence-I RTI Answer Sheets",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20rtis/jurisprudence%20law%20copy%20pdf.pdf",
            },
          ],
        },
      },

      {
        id: 5,
        name: "Law of Torts",
        folder: "torts",

        resources: {
          notes: [
            {
              id: 1,
              title: "Law of Torts Notes",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%201/TORTS%20NOTES.pdf",
            },
            {
              id: 2,
              title: "Torts PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20spare%20material/1st%20sem%20pyqs%20analysis_cropped-3.pdf",
            },
          ],

          bareacts: [],

          casemat: [
            {
              id: 1,
              title: "Law of Torts",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%201/Ist+Term_Law+of+Torts_LB103_2025(pdfgear.com).pdf",
            },
          ],

          pyqs: [],

          dukki: [],

          rti: [
            {
              id: 1,
              title: "Law of Torts RTI Answer Sheet 1",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/1st%20sem%20rtis/torts%20copy.pdf",
            },
            {
              id: 2,
              title: "Law of Torts RTI Answer Sheet 2",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%201%20pyq/torts%20rti%20answer%20sheet.pdf",
            },
          ],
        },
      },
    ],
  },

  {
    id: 2,
    semester: "Semester 3",
    folder: "semester3",

    subjects: [
      {
        id: 1,
        name: "Company Law",
        folder: "company",

        resources: {
          notes: [
            {
              id: 1,
              title: "Company Law : Version 1",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/Company%20Law%20Notes-1.pdf",
            },
            {
              id: 2,
              title: "Company Law : Version 2",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/Company%20Law%20Notes%20by%20LPU.pdf",
            },
            {
              id: 3,
              title: "Company Law PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/3rd%20sem%20spare%20material/3rd-sem-pyqs-analysis-3.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Companies Act, 2013",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/company-law-2013.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "Company Law",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%203/LB-303-Company%20Law%20_2025%20Final_.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "Company Law PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/COMPANY%20till%202023.pdf",
            },
          ],
          dukki: [
            {
              id: 1,
              title: "Company Law Dukki",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/Dukki/Company-law-dukki.pdf",
            },
          ],
          rti: [],
        },
      },

      {
        id: 2,
        name: "Constitutional Law I",
        folder: "const1",

        resources: {
          notes: [
            {
              id: 3,
              title: "Constitutional Law-1 PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/3rd%20sem%20spare%20material/3rd-sem-pyqs-analysis-2.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Constitution of India",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/the-constitution-of-india.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "Constitutional Law-I",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%203/LB-301-Constitutional%20Law-I%20_2022.pdf",
            },
          ],
          pyqs: [
            {
              id: 1,
              title: "Constitutional Law-I",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/Constitutional%20Law-1%20PYQ%20till%202023.pdf",
            },
          ],
          dukki: [
            {
              id: 1,
              title: "Constitutional Law-I Dukki",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/Dukki/Consti1-Dukki.pdf",
            },
          ],
          rti: [],
        },
      },

      {
        id: 3,
        name: "CPC & Limitation",
        folder: "cpc",

        resources: {
          notes: [
            {
              id: 1,
              title: "CPC & Limitation PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/3rd%20sem%20spare%20material/3rd-sem-pyqs-analysis-1.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Code of Civil Procedure Code, 1908",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/the_code_of_civil_procedure,_1908.pdf",
            },
            {
              id: 2,
              title: "The Limitation Act, 1963",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/limitation.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "CPC & Limitation",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%203/LB-302-CPC%20&%20Limitation%20_%202025.pdf",
            },
          ],
          pyqs: [
            {
              id: 1,
              title: "CPC & Limitation PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/CPC%20PYQ%20till%202023.pdf",
            },
          ],
          dukki: [
            {
              id: 1,
              title: "CPC & Limitation Dukki",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/Dukki/CPC-DUKKI.pdf",
            },
          ],
          rti: [],
        },
      },

      {
        id: 4,
        name: "Media & Law",
        folder: "media-law",

        resources: {
          notes: [],

          bareacts: [
            {
              id: 1,
              title:
                "The Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/advertisement-act.pdf",
            },
            {
              id: 2,
              title: "The Press Council Act, 1978",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/press-council-of-india-act.pdf",
            },
          ],
          casemat: [
            {
              id: 1,
              title: "Media and Law",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%203/Media%20and%20Law%20Case%20Material.pdf",
            },
          ],
          pyqs: [],
          dukki: [],
          rti: [],
        },
      },

      {
        id: 5,
        name: "Special Contracts",
        folder: "special-contracts",

        resources: {
          notes: [
            {
              id: 1,
              title: "SOGA & IPA Notes",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/Special%20Contract%20Notes_241020_195120.pdf",
            },
            {
              id: 2,
              title: "Special Contracts PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/3rd%20sem%20spare%20material/3rd-sem-pyqs-analysis-4.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Indian Partnership Act, 1932",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/indian-partnership-act-1932.pdf",
            },
            {
              id: 2,
              title: "The Limited  Liability Partnership Act, 2008",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/limited-liability-partnership-act.pdf",
            },
            {
              id: 3,
              title: "The Sale of Goods Act, 1930",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sale-of-goods-act.pdf",
            },
          ],
          casemat: [
            {
              id: 1,
              title: "Special Contracts PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/Special%20Contract%20till%202023.pdf",
            },
          ],
          pyqs: [
            {
              id: 2,
              title: "Special Contracts Question Paper 2025",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/Special%20Contract%20PYQ%202025.pdf",
            },
          ],
          dukki: [
            {
              id: 1,
              title: "Sale of Goods Act Dukki",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/Dukki/SOGA-Dukki.pdf",
            },
          ],
          rti: [],
        },
      },

      {
        id: 6,
        name: "White Collar Crimes",
        folder: "wcc",

        resources: {
          notes: [
            {
              id: 1,
              title: "White Collar Crimes Notes",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/WCC%20FINAL%202025%20Murari.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Prevention of Corruption Act, 1988",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/prevention-of-corruption-act.pdf",
            },
            {
              id: 2,
              title: "The Food Safety and Standards Act, 2006",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/food-safety-and-standards-act-2006.pdf",
            },
            {
              id: 3,
              title: "THE Narcotic Drugs and Psychotropic Substances Act, 1985",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/narcotic-drugs-and-psychotropic-substances-act-1985.pdf",
            },
          ],
          casemat: [
            {
              id: 1,
              title: "WCC",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%203/LB%203037%20Case%20Material%202026_compressed.pdf",
            },
          ],
          pyqs: [
            {
              id: 1,
              title: "WCC PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/notes%20sem%203/WCC%20till%202023.pdf",
            },
          ],
          dukki: [
            {
              id: 1,
              title: "WCC Dukki",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/Dukki/WCC%20DUkki.pdf",
            },
          ],
          rti: [
            {
              id: 1,
              title: "WCC RTI Answersheets",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/3rd%20sem%20spare%20material/WCC%20RTI%20Copy.pdf",
            },
          ],
        },
      },
    ],
  },

  {
    id: 3,
    semester: "Semester 5",
    folder: "semester5",

    subjects: [
      {
        id: 1,
        name: "Drafting",
        folder: "drafting",

        resources: {
          notes: [
            {
              id: 1,
              title: "Drafting, Pleading & Conveyance Notes",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/5th%20sem%20spare%20material/Drafting,%20Pleading%20and%20Conveyancing.pdf",
            },
            {
              id: 2,
              title: "Drafting, Pleading & Conveyance PYQs Notes",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/5th%20sem%20spare%20material/drafting-pleading.pdf",
            },
          ],

          bareacts: [],

          casemat: [
            {
              id: 1,
              title: "Drafting, Pleading & Conveyance Case Material",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%205/Drafting%20case%20material%20-2025.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "Drafting, Pleading & Conveyance PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%206%20pyqs/DRAFTING-PYQ.pdf",
            },
          ],

          dukki: [],

          rti: [],
        },
      },

      {
        id: 2,
        name: "DRC",
        folder: "drc",

        resources: {
          notes: [],

          bareacts: [
            {
              id: 1,
              title: "The Delhi Rent Control Act, 1958",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bare%20acts%20sem%205/drc.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "Rent Control and Slum Clearance",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%205/Rent-Control-2020.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "Rent Control and Slum Clearance PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%206%20pyqs/DRC-PYQ.pdf",
            },
          ],

          dukki: [],

          rti: [],
        },
      },

      {
        id: 3,
        name: "Industrial Law",
        folder: "industrial-law",

        resources: {
          notes: [
            {
              id: 1,
              title: "Industrial Law PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/5th%20sem%20spare%20material/industrial%20-law-pyqs-analysis.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Industrial Relations Code, 2020",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bare%20acts%20sem%205/irc,2020.pdf",
            },
            {
              id: 2,
              title: "The Industrial Disputes Act, 1947",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bare%20acts%20sem%205/the_industrial_disputes_act.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "Industrial Law",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%205/LB-503%20Industrial-Law-including-IDRA.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "Industrial Law PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%206%20pyqs/Industrial-Law-PYQ.pdf",
            },
          ],

          dukki: [
            {
              id: 1,
              title: "Industrial Law Dukki",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/5th%20sem%20spare%20material/SINGHAL%20Industrial%20Law%202020%20Reprint.pdf",
            },
          ],

          rti: [],
        },
      },

      {
        id: 4,
        name: "IPR II",
        folder: "ipr2",

        resources: {
          notes: [
            {
              id: 1,
              title: "IPR II PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/5th%20sem%20spare%20material/ipr2.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Copyright Act, 1957",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bare%20acts%20sem%205/copyright.pdf",
            },
            {
              id: 2,
              title: "The Patents Act, 1970",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bare%20acts%20sem%205/patents.pdf",
            },
            {
              id: 3,
              title:
                "The Protection of Plant Varieties and Farmers’ Rights Act, 2001",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bare%20acts%20sem%205/plant%20variety.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "Intellectual Property Rights Law-II",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%205/IPR-II-July-2020.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "Intellectual Property Rights Law-II PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%206%20pyqs/IPR2-PYQ.pdf",
            },
          ],

          dukki: [],

          rti: [],
        },
      },

      {
        id: 5,
        name: "IT Law",
        folder: "it-law",

        resources: {
          notes: [
            {
              id: 1,
              title: "IT Law Cases Summary",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/5th%20sem%20spare%20material/IT-law-case-summary.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Information Technology Act, 2000",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bare%20acts%20sem%205/it_act_2000_updated.pdf",
            },
            {
              id: 2,
              title: "The Bharatiya Sakshay Adhiniyam, 2023",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bare%20acts%20sem%205/bsa.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "Information Technology Law",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%205/CMITLAW2026.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "IT Law PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%206%20pyqs/IT-Law-PYQ.pdf",
            },
          ],

          dukki: [],

          rti: [],
        },
      },

      {
        id: 6,
        name: "Taxation",
        folder: "taxation",

        resources: {
          notes: [
            {
              id: 1,
              title: "Taxation Law PYQs Analysis",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/5th%20sem%20spare%20material/tax-law.pdf",
            },
          ],

          bareacts: [
            {
              id: 1,
              title: "The Income Tax Act, 1961",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/bare%20acts%20sem%205/income%20tax%20act.pdf",
            },
          ],

          casemat: [
            {
              id: 1,
              title: "Principles of Taxation Law",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/case%20material%20sem%205/VIth%20Term_Principles%20of%20Taxation%20Law_LB%20604_2023.pdf",
            },
          ],

          pyqs: [
            {
              id: 1,
              title: "Taxation PYQs",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/sem%206%20pyqs/Taxation-PYQ.pdf",
            },
          ],

          dukki: [
            {
              id: 1,
              title: "Taxation Law Dukki",
              file: "https://nheykzzachkznfsqsxmc.supabase.co/storage/v1/object/public/study-material/5th%20sem%20spare%20material/Tax%20Law%20Singhal%20Dukki_compressed.pdf",
            },
          ],

          rti: [],
        },
      },
    ],
  },
];

export default studyMaterial;
