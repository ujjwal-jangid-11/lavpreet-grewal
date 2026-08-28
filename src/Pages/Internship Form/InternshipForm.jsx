import { useRef, useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaChevronDown,
  FaCloudUploadAlt,
  FaEnvelope,
  FaExclamationCircle,
  FaFileAlt,
  FaIdCard,
  FaInfoCircle,
  FaLock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTrash,
  FaUser,
  FaUsers,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";
import "./InternshipForm.css";

const COURTS = [
  "Tis Hazari",
  "Saket",
  "Karkardooma",
  "Dwarka",
  "Rohini",
  "Patiala House",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year"];

const SEMESTERS = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
];

const INTERNSHIP_YEARS = ["2026", "2027"];

const INTERNSHIP_MONTHS = {
  2026: ["September", "October", "November", "December"],
  2027: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ],
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const STORAGE_BUCKET = "internship-applications";

function InternshipForm() {
  const cvInputRef = useRef(null);
  const idCardInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    year: "",
    semester: "",
    section: "",
    rollNumber: "",
    localAddress: "",
    contactNumber: "",
    email: "",
    courtPreference: "",
    internshipYear: "",
    internshipMonth: "",
  });

  const [cvFile, setCvFile] = useState(null);
  const [idCardFile, setIdCardFile] = useState(null);

  const [declaration, setDeclaration] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "internshipYear") {
      setFormData((current) => ({
        ...current,
        internshipYear: value,
        internshipMonth: "",
      }));

      setErrors((current) => ({
        ...current,
        internshipYear: "",
        internshipMonth: "",
      }));
    } else {
      setFormData((current) => ({
        ...current,
        [name]: value,
      }));

      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }

    setSubmitError("");
    setSubmitSuccess("");
  };

  const validatePdf = (file, fieldName) => {
    if (!file) {
      return `${fieldName} is required.`;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return `${fieldName} must be uploaded in PDF format only.`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return `${fieldName} must not exceed 5MB.`;
    }

    return "";
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const fieldName =
      type === "cv" ? "CV" : "Law Centre II ID Card / Fee Receipt";

    const fileError = validatePdf(file, fieldName);

    if (fileError) {
      setErrors((current) => ({
        ...current,
        [type]: fileError,
      }));

      event.target.value = "";
      return;
    }

    if (type === "cv") {
      setCvFile(file);
    } else {
      setIdCardFile(file);
    }

    setErrors((current) => ({
      ...current,
      [type]: "",
    }));

    setSubmitError("");
    setSubmitSuccess("");
  };

  const removeFile = (type) => {
    if (type === "cv") {
      setCvFile(null);

      if (cvInputRef.current) {
        cvInputRef.current.value = "";
      }
    } else {
      setIdCardFile(null);

      if (idCardInputRef.current) {
        idCardInputRef.current.value = "";
      }
    }

    setErrors((current) => ({
      ...current,
      [type]: "",
    }));

    setSubmitError("");
    setSubmitSuccess("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!formData.year) {
      nextErrors.year = "Please select your current year.";
    }

    if (!formData.semester) {
      nextErrors.semester = "Please select your semester.";
    }

    if (!formData.section.trim()) {
      nextErrors.section = "Please enter your section.";
    }

    if (!formData.rollNumber.trim()) {
      nextErrors.rollNumber = "Please enter your class roll number.";
    }

    if (!formData.localAddress.trim()) {
      nextErrors.localAddress = "Please enter your local address.";
    }

    if (!formData.contactNumber.trim()) {
      nextErrors.contactNumber =
        "Please enter your WhatsApp or contact number.";
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.contactNumber.trim())) {
      nextErrors.contactNumber = "Please enter a valid contact number.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.courtPreference) {
      nextErrors.courtPreference = "Please select your preferred court.";
    }

    if (!formData.internshipYear) {
      nextErrors.internshipYear =
        "Please select your preferred internship year.";
    }

    if (!formData.internshipMonth) {
      nextErrors.internshipMonth =
        "Please select your preferred internship month.";
    }

    if (
      formData.internshipYear &&
      formData.internshipMonth &&
      !INTERNSHIP_MONTHS[formData.internshipYear]?.includes(
        formData.internshipMonth,
      )
    ) {
      nextErrors.internshipMonth = "Please select a valid internship month.";
    }

    const cvError = validatePdf(cvFile, "CV");

    if (cvError) {
      nextErrors.cv = cvError;
    }

    const idCardError = validatePdf(
      idCardFile,
      "Law Centre II ID Card / Fee Receipt",
    );

    if (idCardError) {
      nextErrors.idCard = idCardError;
    }

    if (!declaration) {
      nextErrors.declaration =
        "Please confirm the declaration before submitting.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const createSecureFilePath = (type, file) => {
    const randomPart =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const extension = file.name.split(".").pop()?.toLowerCase();

    return `applications/${randomPart}-${type}.${extension || "pdf"}`;
  };

  const uploadApplicationFile = async (file, type) => {
    const path = createSecureFilePath(type, file);

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, {
        cacheControl: "3600",
        contentType: "application/pdf",
        upsert: false,
      });

    if (error) {
      console.error(`Supabase storage upload error for ${type}:`, error);

      throw new Error(
        `Unable to upload ${
          type === "cv" ? "CV" : "ID card / fee receipt"
        }.`,
      );
    }

    return path;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!declaration || submitting) {
      if (!declaration) {
        setErrors((current) => ({
          ...current,
          declaration: "Please confirm the declaration before submitting.",
        }));
      }

      return;
    }

    setSubmitError("");
    setSubmitSuccess("");

    const isValid = validateForm();

    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSubmitting(true);

    let uploadedCvPath = null;
    let uploadedIdCardPath = null;

    try {
      /*
       * Upload CV first.
       */
      uploadedCvPath = await uploadApplicationFile(cvFile, "cv");

      /*
       * Upload ID card / fee receipt.
       */
      uploadedIdCardPath = await uploadApplicationFile(idCardFile, "id-card");

      /*
       * Store application details in Supabase.
       *
       * IMPORTANT:
       * The database constraint expects internship_month
       * in the format "Month Year", e.g. "September 2026".
       */
      const { error: insertError } = await supabase
        .from("internship_applications")
        .insert({
          name: formData.name.trim(),
          current_year: formData.year,
          semester: formData.semester,
          section: formData.section.trim(),
          class_roll_number: formData.rollNumber.trim(),
          local_address: formData.localAddress.trim(),
          contact_number: formData.contactNumber.trim(),
          email: formData.email.trim().toLowerCase(),
          court_preference: formData.courtPreference,

          internship_year: formData.internshipYear,
          internship_month: `${formData.internshipMonth} ${formData.internshipYear}`,

          cv_path: uploadedCvPath,
          cv_original_name: cvFile.name,

          id_card_receipt_path: uploadedIdCardPath,
          id_card_receipt_original_name: idCardFile.name,
        });

      /*
       * If database insertion fails, remove uploaded files.
       */
      if (insertError) {
        console.error("Supabase database insert error:", insertError);

        if (uploadedCvPath) {
          await supabase.storage
            .from(STORAGE_BUCKET)
            .remove([uploadedCvPath]);
        }

        if (uploadedIdCardPath) {
          await supabase.storage
            .from(STORAGE_BUCKET)
            .remove([uploadedIdCardPath]);
        }

        throw new Error(
          "Your application could not be submitted. Please try again.",
        );
      }

      /*
       * Show success before resetting the form.
       */
      setSubmitSuccess(
        "Your application has been submitted successfully. Thank you for applying.",
      );

      setSubmitError("");

      setFormData({
        name: "",
        year: "",
        semester: "",
        section: "",
        rollNumber: "",
        localAddress: "",
        contactNumber: "",
        email: "",
        courtPreference: "",
        internshipYear: "",
        internshipMonth: "",
      });

      setCvFile(null);
      setIdCardFile(null);
      setDeclaration(false);
      setErrors({});

      if (cvInputRef.current) {
        cvInputRef.current.value = "";
      }

      if (idCardInputRef.current) {
        idCardInputRef.current.value = "";
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Internship application submission error:", error);

      setSubmitSuccess("");

      setSubmitError(
        error?.message ||
          "Something went wrong while submitting your application. Please try again.",
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderError = (message) => {
    if (!message) return null;

    return (
      <div className="internship-field-error">
        <FaExclamationCircle />
        <span>{message}</span>
      </div>
    );
  };

  const selectedInternshipMonths = formData.internshipYear
    ? INTERNSHIP_MONTHS[formData.internshipYear] || []
    : [];

  return (
    <main className="internship-page">
      <div className="internship-container">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="internship-hero">
          <div className="internship-hero-badge">
            <span className="internship-hero-dot" />
            LC-II INTERNSHIP PROGRAMME
          </div>

          <h1>
            Internship
            <span>Application Form.</span>
          </h1>

          <p>
            Submit your details and required documents carefully. All
            information provided through this form is collected solely for the
            purpose of internship placement and related administrative
            requirements.
          </p>

          <div className="internship-capacity-notice">
            <div className="internship-capacity-icon">
              <FaInfoCircle />
            </div>

            <div>
              <strong>Placement Planning</strong>

              <span>
                Placement planning is currently structured around a limited
                batch of 20 students for each court. Applicants are therefore
                encouraged to indicate their preference carefully.
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            ALERTS
        ===================================================== */}

        {submitError && (
          <div className="internship-alert internship-alert-error" role="alert">
            <FaExclamationCircle />

            <div>
              <strong>Submission unsuccessful</strong>
              <span>{submitError}</span>
            </div>
          </div>
        )}

        {submitSuccess && (
          <div
            className="internship-alert internship-alert-success"
            role="status"
            aria-live="polite"
          >
            <FaCheck />

            <div>
              <strong>Application submitted</strong>
              <span>{submitSuccess}</span>
            </div>
          </div>
        )}

        {/* =====================================================
            FORM
        ===================================================== */}

        <form className="internship-form" onSubmit={handleSubmit} noValidate>
          {/* ===================================================
              PERSONAL DETAILS
          =================================================== */}

          <section className="internship-form-section">
            <div className="internship-section-heading">
              <div className="internship-section-number">01</div>

              <div>
                <span>Applicant</span>
                <h2>Personal Details</h2>
              </div>
            </div>

            <div className="internship-fields-grid">
              {/* FULL NAME */}

              <div className="internship-field">
                <label htmlFor="internship-name">
                  Full Name <span>*</span>
                </label>

                <div className="internship-input-wrap">
                  <FaUser />

                  <input
                    id="internship-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={100}
                    disabled={submitting}
                    required
                  />
                </div>

                {renderError(errors.name)}
              </div>

              {/* YEAR */}

              <div className="internship-field">
                <label htmlFor="internship-year">
                  Current Year of Course <span>*</span>
                </label>

                <div className="internship-select-wrap">
                  <select
                    id="internship-year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  >
                    <option value="" disabled>
                      Select your current year
                    </option>

                    {YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <FaChevronDown />
                </div>

                {renderError(errors.year)}
              </div>

              {/* SEMESTER */}

              <div className="internship-field">
                <label htmlFor="internship-semester">
                  Semester <span>*</span>
                </label>

                <div className="internship-select-wrap">
                  <select
                    id="internship-semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  >
                    <option value="" disabled>
                      Select your semester
                    </option>

                    {SEMESTERS.map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </select>

                  <FaChevronDown />
                </div>

                {renderError(errors.semester)}
              </div>

              {/* SECTION */}

              <div className="internship-field">
                <label htmlFor="internship-section">
                  Section <span>*</span>
                </label>

                <div className="internship-input-wrap">
                  <FaUsers />

                  <input
                    id="internship-section"
                    name="section"
                    type="text"
                    value={formData.section}
                    onChange={handleChange}
                    placeholder="Enter your section"
                    maxLength={20}
                    disabled={submitting}
                    required
                  />
                </div>

                {renderError(errors.section)}
              </div>

              {/* ROLL NUMBER */}

              <div className="internship-field internship-field-full">
                <label htmlFor="internship-roll-number">
                  Class Roll Number <span>*</span>
                </label>

                <div className="internship-input-wrap">
                  <FaIdCard />

                  <input
                    id="internship-roll-number"
                    name="rollNumber"
                    type="text"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="Enter your class roll number"
                    maxLength={30}
                    disabled={submitting}
                    required
                  />
                </div>

                {renderError(errors.rollNumber)}
              </div>

              {/* LOCAL ADDRESS */}

              <div className="internship-field internship-field-full">
                <label htmlFor="internship-local-address">
                  Local Address <span>*</span>
                </label>

                <div className="internship-input-wrap internship-textarea-wrap">
                  <FaMapMarkerAlt className="internship-textarea-icon" />

                  <textarea
                    id="internship-local-address"
                    name="localAddress"
                    value={formData.localAddress}
                    onChange={handleChange}
                    placeholder="Enter your local address"
                    maxLength={500}
                    disabled={submitting}
                    required
                  />
                </div>

                {renderError(errors.localAddress)}
              </div>

              {/* CONTACT */}

              <div className="internship-field">
                <label htmlFor="internship-contact">
                  Whatsapp or Contact Number <span>*</span>
                </label>

                <div className="internship-input-wrap">
                  <FaPhoneAlt />

                  <input
                    id="internship-contact"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    autoComplete="tel"
                    maxLength={15}
                    disabled={submitting}
                    required
                  />
                </div>

                {renderError(errors.contactNumber)}
              </div>

              {/* EMAIL */}

              <div className="internship-field">
                <label htmlFor="internship-email">
                  Email <span>*</span>
                </label>

                <div className="internship-input-wrap">
                  <FaEnvelope />

                  <input
                    id="internship-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    maxLength={150}
                    disabled={submitting}
                    required
                  />
                </div>

                {renderError(errors.email)}
              </div>
            </div>
          </section>

          {/* ===================================================
              COURT PREFERENCE
          =================================================== */}

          <section className="internship-form-section">
            <div className="internship-section-heading">
              <div className="internship-section-number">02</div>

              <div>
                <span>Placement</span>
                <h2>Court Preference</h2>
              </div>
            </div>

            <div className="internship-court-intro">
              <p>
                Select the court where you would prefer to undertake your
                internship placement.
              </p>
            </div>

            <div className="internship-court-grid">
              {COURTS.map((court) => {
                const selected = formData.courtPreference === court;

                return (
                  <label
                    key={court}
                    className={`internship-court-option ${
                      selected ? "is-selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="courtPreference"
                      value={court}
                      checked={selected}
                      onChange={handleChange}
                      disabled={submitting}
                      required
                    />

                    <span className="internship-court-radio">
                      <span />
                    </span>

                    <span className="internship-court-content">
                      <strong>{court}</strong>

                      <small>Preferred placement court</small>
                    </span>
                  </label>
                );
              })}
            </div>

            {renderError(errors.courtPreference)}

            <div className="internship-court-note">
              <FaInfoCircle />

              <p>
                <strong>Placement note:</strong> The current placement plan is
                designed around a batch of up to 20 students for each court.
                Final allocation will be subject to the placement process and
                available arrangements.
              </p>
            </div>
          </section>

          {/* ===================================================
              INTERNSHIP MONTH PREFERENCE
          =================================================== */}

          <section className="internship-form-section">
            <div className="internship-section-heading">
              <div className="internship-section-number">03</div>

              <div>
                <span>Placement</span>
                <h2>Internship Month Preference</h2>
              </div>
            </div>

            <div className="internship-court-intro">
              <p>
                Select the year and month in which you would prefer to undertake
                your internship.
              </p>
            </div>

            <div className="internship-fields-grid">
              {/* INTERNSHIP YEAR */}

              <div className="internship-field">
                <label htmlFor="internship-preference-year">
                  Internship Year <span>*</span>
                </label>

                <div className="internship-select-wrap">
                  <select
                    id="internship-preference-year"
                    name="internshipYear"
                    value={formData.internshipYear}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  >
                    <option value="" disabled>
                      Select internship year
                    </option>

                    {INTERNSHIP_YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <FaChevronDown />
                </div>

                {renderError(errors.internshipYear)}
              </div>

              {/* INTERNSHIP MONTH */}

              <div className="internship-field">
                <label htmlFor="internship-preference-month">
                  Preferred Month <span>*</span>
                </label>

                <div className="internship-select-wrap">
                  <select
                    id="internship-preference-month"
                    name="internshipMonth"
                    value={formData.internshipMonth}
                    onChange={handleChange}
                    disabled={submitting || !formData.internshipYear}
                    required
                  >
                    <option value="" disabled>
                      {formData.internshipYear
                        ? "Select preferred month"
                        : "Select year first"}
                    </option>

                    {selectedInternshipMonths.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <FaChevronDown />
                </div>

                {renderError(errors.internshipMonth)}
              </div>
            </div>

            <div className="internship-court-note">
              <FaInfoCircle />

              <p>
                <strong>Month preference:</strong> For 2026, internship
                preferences are available from September to December. For 2027,
                preferences are available from January to August.
              </p>
            </div>
          </section>

          {/* ===================================================
              DOCUMENT UPLOADS
          =================================================== */}

          <section className="internship-form-section">
            <div className="internship-section-heading">
              <div className="internship-section-number">04</div>

              <div>
                <span>Verification</span>
                <h2>Document Uploads</h2>
              </div>
            </div>

            <div className="internship-document-intro">
              <p>
                Upload both required documents in PDF format only. Each document
                must be no larger than 5MB.
              </p>
            </div>

            <div className="internship-document-grid">
              {/* CV */}

              <div className="internship-upload-wrapper">
                <div
                  className={`internship-upload-card ${
                    cvFile ? "has-file" : ""
                  } ${errors.cv ? "has-error" : ""}`}
                >
                  {!cvFile ? (
                    <div className="internship-upload-content">
                      <div className="internship-upload-icon">
                        <FaFileAlt />
                      </div>

                      <h4>Upload CV</h4>

                      <p>Upload your latest curriculum vitae in PDF format.</p>

                      <input
                        ref={cvInputRef}
                        id="internship-cv"
                        className="internship-file-input"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={(event) => handleFileChange(event, "cv")}
                        disabled={submitting}
                        required
                      />

                      <button
                        type="button"
                        className="internship-upload-button"
                        onClick={() => cvInputRef.current?.click()}
                        disabled={submitting}
                      >
                        <FaCloudUploadAlt />
                        Choose PDF File
                      </button>

                      <span className="internship-upload-hint">
                        PDF only · Maximum file size: 5MB
                      </span>
                    </div>
                  ) : (
                    <div className="internship-selected-file">
                      <div className="internship-selected-file-icon">
                        <FaFileAlt />
                      </div>

                      <div className="internship-selected-file-info">
                        <span className="internship-selected-file-label">
                          CV UPLOADED
                        </span>

                        <strong title={cvFile.name}>{cvFile.name}</strong>

                        <small>
                          {(cvFile.size / (1024 * 1024)).toFixed(2)} MB · PDF
                        </small>
                      </div>

                      <button
                        type="button"
                        className="internship-remove-file"
                        onClick={() => removeFile("cv")}
                        disabled={submitting}
                        aria-label="Remove CV"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>

                {renderError(errors.cv)}
              </div>

              {/* ID CARD / FEE RECEIPT */}

              <div className="internship-upload-wrapper">
                <div
                  className={`internship-upload-card ${
                    idCardFile ? "has-file" : ""
                  } ${errors.idCard ? "has-error" : ""}`}
                >
                  {!idCardFile ? (
                    <div className="internship-upload-content">
                      <div className="internship-upload-icon">
                        <FaIdCard />
                      </div>

                      <h4>Law Centre II ID Card / Fee Receipt</h4>

                      <p>
                        Upload your Law Centre II ID card or applicable fee
                        receipt.
                      </p>

                      <input
                        ref={idCardInputRef}
                        id="internship-id-card"
                        className="internship-file-input"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={(event) => handleFileChange(event, "idCard")}
                        disabled={submitting}
                        required
                      />

                      <button
                        type="button"
                        className="internship-upload-button"
                        onClick={() => idCardInputRef.current?.click()}
                        disabled={submitting}
                      >
                        <FaCloudUploadAlt />
                        Choose PDF File
                      </button>

                      <span className="internship-upload-hint">
                        PDF only · Maximum file size: 5MB
                      </span>
                    </div>
                  ) : (
                    <div className="internship-selected-file">
                      <div className="internship-selected-file-icon">
                        <FaIdCard />
                      </div>

                      <div className="internship-selected-file-info">
                        <span className="internship-selected-file-label">
                          ID / FEE RECEIPT UPLOADED
                        </span>

                        <strong title={idCardFile.name}>
                          {idCardFile.name}
                        </strong>

                        <small>
                          {(idCardFile.size / (1024 * 1024)).toFixed(2)} MB ·
                          PDF
                        </small>
                      </div>

                      <button
                        type="button"
                        className="internship-remove-file"
                        onClick={() => removeFile("idCard")}
                        disabled={submitting}
                        aria-label="Remove ID card or fee receipt"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>

                {renderError(errors.idCard)}
              </div>
            </div>
          </section>

          {/* ===================================================
              DECLARATION + SUBMIT
          =================================================== */}

          <section className="internship-submit-section">
            <label className="internship-declaration">
              <input
                type="checkbox"
                checked={declaration}
                onChange={(event) => {
                  const checked = event.target.checked;

                  setDeclaration(checked);

                  setErrors((current) => ({
                    ...current,
                    declaration: "",
                  }));

                  setSubmitError("");
                  setSubmitSuccess("");
                }}
                disabled={submitting}
              />

              <span className="internship-custom-checkbox">
                <FaCheck />
              </span>

              <span>
                I hereby declare that all the information provided above is true
                and correct to the best of my knowledge.
              </span>
            </label>

            {renderError(errors.declaration)}

            <div className="internship-security-note">
              <FaLock />

              <p>
                Your information is handled securely and is used only for the
                purpose of processing this internship application and related
                placement requirements.
              </p>
            </div>

            <button
              type="submit"
              className="internship-submit-button"
              disabled={!declaration || submitting}
              aria-disabled={!declaration || submitting}
            >
              {submitting ? (
                <>
                  <span className="internship-submit-spinner" />
                  Submitting Application
                </>
              ) : (
                <>
                  Submit Application
                  <FaArrowRight />
                </>
              )}
            </button>

            <p className="internship-required-note">
              <span>*</span> All fields are mandatory.
            </p>
          </section>
        </form>
      </div>
    </main>
  );
}

export default InternshipForm;