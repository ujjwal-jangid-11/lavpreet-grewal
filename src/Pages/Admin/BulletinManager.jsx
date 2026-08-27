import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaPlus,
  FaBriefcase,
  FaBookOpen,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import "./BulletinManager.css";

function BulletinManager() {
  const navigate = useNavigate();

  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBulletin, setEditingBulletin] = useState(null);
  const [saving, setSaving] = useState(false);

  // =====================================================
  // FORM
  // =====================================================

  const [category, setCategory] = useState("internship");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Internship fields
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [deadline, setDeadline] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");

  // Uploaded file
  const [uploadedFile, setUploadedFile] = useState(null);

  // Existing file URL
  const [existingFileUrl, setExistingFileUrl] = useState("");

  // Important update field
  const [sourceUrl, setSourceUrl] = useState("");

  // =====================================================
  // FETCH BULLETINS
  // =====================================================

  const fetchBulletins = async () => {
    setLoading(true);

    try {
      const [
        { data: internshipData, error: internshipError },
        { data: updateData, error: updateError },
      ] = await Promise.all([
        // Internships come from dedicated internships table
        supabase
          .from("internships")
          .select("*")
          .order("deadline", {
            ascending: true,
            nullsFirst: false,
          })
          .order("created_at", {
            ascending: false,
          }),

        // Useful information comes from bulletins table
        supabase
          .from("bulletins")
          .select("*")
          .eq("category", "useful_info")
          .order("date", {
            ascending: false,
            nullsFirst: false,
          })
          .order("created_at", {
            ascending: false,
          }),
      ]);

      if (internshipError) {
        throw internshipError;
      }

      if (updateError) {
        throw updateError;
      }

      const internshipItems = (internshipData || []).map((item) => ({
        ...item,
        category: "internship",
      }));

      const updateItems = (updateData || []).map((item) => ({
        ...item,
        category: "useful_info",
      }));

      const mergedData = [...internshipItems, ...updateItems].sort((a, b) => {
        const dateA = new Date(
          a.created_at || a.date || a.deadline || 0,
        ).getTime();

        const dateB = new Date(
          b.created_at || b.date || b.deadline || 0,
        ).getTime();

        return dateB - dateA;
      });

      setBulletins(mergedData);
    } catch (error) {
      console.error("Failed to fetch bulletin data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBulletins();
  }, []);

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setCategory("internship");

    setTitle("");
    setDescription("");

    setOrganization("");
    setRole("");
    setLocation("");
    setDuration("");
    setDeadline("");
    setApplicationUrl("");

    setUploadedFile(null);
    setExistingFileUrl("");

    setSourceUrl("");

    setEditingBulletin(null);
  };

  // =====================================================
  // OPEN CREATE FORM
  // =====================================================

  const openCreateForm = () => {
    resetForm();
    setShowCreateForm(true);
  };

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const closeForm = () => {
    if (saving) return;

    resetForm();
    setShowCreateForm(false);
  };

  // =====================================================
  // EDIT BULLETIN
  // =====================================================

  const openEditForm = (bulletin) => {
    setEditingBulletin(bulletin);

    setCategory(bulletin.category || "internship");

    setTitle(bulletin.title || "");
    setDescription(bulletin.description || "");

    setOrganization(bulletin.organization || "");
    setRole(bulletin.role || "");
    setLocation(bulletin.location || "");
    setDuration(bulletin.duration || "");
    setDeadline(bulletin.deadline || "");
    setApplicationUrl(bulletin.application_url || "");

    setExistingFileUrl(bulletin.pdf_url || "");
    setUploadedFile(null);

    setSourceUrl(bulletin.source_url || "");

    setShowCreateForm(true);
  };

  // =====================================================
  // FILE CHANGE
  // =====================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setUploadedFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or image file.");
      event.target.value = "";
      setUploadedFile(null);
      return;
    }

    setUploadedFile(file);
  };

  // =====================================================
  // GET STORAGE PATH FROM PUBLIC URL
  // =====================================================

  const getStoragePathFromUrl = (fileUrl) => {
    if (!fileUrl) {
      return null;
    }

    try {
      const url = new URL(fileUrl);

      const marker = "/storage/v1/object/public/bulletins/";

      const markerIndex = url.pathname.indexOf(marker);

      if (markerIndex === -1) {
        return null;
      }

      const filePath = url.pathname.substring(markerIndex + marker.length);

      return decodeURIComponent(filePath);
    } catch (error) {
      console.error("Failed to extract storage path:", error.message);

      return null;
    }
  };

  // =====================================================
  // DELETE STORAGE FILE
  // =====================================================

  const deleteStorageFile = async (fileUrl) => {
    if (!fileUrl) {
      return;
    }

    const filePath = getStoragePathFromUrl(fileUrl);

    if (!filePath) {
      console.warn("Could not determine Storage path from file URL.");
      return;
    }

    const { error } = await supabase.storage
      .from("bulletins")
      .remove([filePath]);

    if (error) {
      console.error("Failed to delete Storage file:", error.message);

      throw error;
    }
  };

  // =====================================================
  // UPLOAD FILE
  // =====================================================

  const uploadFile = async () => {
    if (!uploadedFile) {
      return existingFileUrl || null;
    }

    const fileExtension = uploadedFile.name.split(".").pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExtension}`;

    const filePath = `bulletins/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("bulletins")
      .upload(filePath, uploadedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("File upload failed:", uploadError.message);

      throw uploadError;
    }

    const { data } = supabase.storage.from("bulletins").getPublicUrl(filePath);

    return data?.publicUrl || null;
  };

  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSaveBulletin = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (category === "internship" && !organization.trim()) {
      alert("Please enter the organization/company name.");
      return;
    }

    setSaving(true);

    try {
      // =================================================
      // INTERNSHIP
      // =================================================

      if (category === "internship") {
        const oldFileUrl = existingFileUrl || null;

        let fileUrl = existingFileUrl || null;

        if (uploadedFile) {
          // Upload the new file first.
          fileUrl = await uploadFile();
        }

        const internshipData = {
          organization: organization.trim(),
          role: role.trim() || null,
          location: location.trim() || null,
          duration: duration.trim() || null,
          deadline: deadline || null,
          application_url: applicationUrl.trim() || null,
          pdf_url: fileUrl,
          description: description.trim() || null,
        };

        let error;

        if (editingBulletin) {
          const result = await supabase
            .from("internships")
            .update(internshipData)
            .eq("id", editingBulletin.id);

          error = result.error;

          // =================================================
          // DELETE OLD FILE AFTER SUCCESSFUL DB UPDATE
          // =================================================

          if (!error && uploadedFile && oldFileUrl) {
            try {
              await deleteStorageFile(oldFileUrl);
            } catch (storageError) {
              console.error(
                "Old Storage file could not be deleted:",
                storageError.message,
              );
            }
          }
        } else {
          const result = await supabase
            .from("internships")
            .insert([internshipData]);

          error = result.error;

          // =================================================
          // CLEAN UP NEWLY UPLOADED FILE IF DB INSERT FAILS
          // =================================================

          if (error && uploadedFile && fileUrl) {
            try {
              await deleteStorageFile(fileUrl);
            } catch (storageError) {
              console.error(
                "Uploaded file cleanup failed:",
                storageError.message,
              );
            }
          }
        }

        if (error) {
          console.error("Failed to save internship:", error.message);

          alert(error.message);
          return;
        }
      }

      // =================================================
      // USEFUL INFORMATION
      // =================================================

      if (category === "useful_info") {
        const updateData = {
          category: "useful_info",
          title: title.trim(),
          description: description.trim(),
          source_url: sourceUrl.trim() || null,
        };

        let error;

        if (editingBulletin) {
          const result = await supabase
            .from("bulletins")
            .update(updateData)
            .eq("id", editingBulletin.id)
            .eq("category", "useful_info");

          error = result.error;
        } else {
          const result = await supabase.from("bulletins").insert([updateData]);

          error = result.error;
        }

        if (error) {
          console.error("Failed to save useful information:", error.message);

          alert(error.message);
          return;
        }
      }

      setShowCreateForm(false);
      resetForm();

      await fetchBulletins();
    } catch (error) {
      console.error("Failed to save bulletin:", error.message);

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDeleteBulletin = async (bulletin) => {
    const confirmed = window.confirm(
      `Delete "${bulletin.title || bulletin.role || "this item"}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      // =================================================
      // INTERNSHIP
      // =================================================

      if (bulletin.category === "internship") {
        const fileUrl = bulletin.pdf_url || null;

        const result = await supabase
          .from("internships")
          .delete()
          .eq("id", bulletin.id);

        if (result.error) {
          console.error("Failed to delete internship:", result.error.message);

          alert(result.error.message);
          return;
        }

        // =================================================
        // DELETE ATTACHED FILE FROM STORAGE
        // =================================================

        if (fileUrl) {
          try {
            await deleteStorageFile(fileUrl);
          } catch (storageError) {
            console.error(
              "Internship deleted but Storage file could not be deleted:",
              storageError.message,
            );

            alert(
              "Internship deleted, but the attached file could not be removed from Storage.",
            );
          }
        }
      }

      // =================================================
      // USEFUL INFORMATION
      // =================================================

      if (bulletin.category === "useful_info") {
        const result = await supabase
          .from("bulletins")
          .delete()
          .eq("id", bulletin.id)
          .eq("category", "useful_info");

        if (result.error) {
          console.error("Failed to delete bulletin:", result.error.message);

          alert(result.error.message);
          return;
        }
      }

      await fetchBulletins();
    } catch (error) {
      console.error("Failed to delete bulletin:", error.message);

      alert(error.message);
    }
  };

  // =====================================================
  // HELPERS
  // =====================================================

  const getCategoryLabel = (bulletin) => {
    if (bulletin.category === "internship") {
      return "INTERNSHIP";
    }

    return "IMPORTANT UPDATE";
  };

  const getCategoryIcon = (bulletin) => {
    if (bulletin.category === "internship") {
      return <FaBriefcase />;
    }

    return <FaBookOpen />;
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="bulletin-manager">
      <div className="bulletin-manager-container">
        {/* ================= TOP BAR ================= */}

        <div className="bulletin-manager-topbar">
          <button
            type="button"
            className="bulletin-manager-back"
            onClick={() => navigate("/admin")}
          >
            <FaArrowLeft />
            <span>Back to Admin</span>
          </button>
        </div>

        {/* ================= HEADER ================= */}

        <header className="bulletin-manager-header">
          <div className="bulletin-manager-header-left">
            <div className="bulletin-manager-header-icon">
              <FaBriefcase />
            </div>

            <div className="bulletin-manager-header-text">
              <span className="bulletin-manager-eyebrow">
                CONTENT MANAGEMENT
              </span>

              <h1>Bulletin Manager</h1>

              <p>
                Manage internship opportunities and important student
                information published on your website.
              </p>
            </div>
          </div>

          {!showCreateForm && (
            <button
              type="button"
              className="bulletin-manager-add-button"
              onClick={openCreateForm}
            >
              <FaPlus />
              <span>Add Content</span>
            </button>
          )}
        </header>

        {/* ================= CREATE / EDIT FORM ================= */}

        {showCreateForm && (
          <section className="bulletin-create-section">
            <div className="bulletin-create-header">
              <div>
                <span className="bulletin-create-eyebrow">
                  {editingBulletin ? "EDIT CONTENT" : "NEW CONTENT"}
                </span>

                <h2>
                  {editingBulletin ? "Edit Bulletin" : "Add Bulletin Content"}
                </h2>

                <p>
                  Add the information that should appear in the student
                  bulletin.
                </p>
              </div>

              <button
                type="button"
                className="bulletin-create-close"
                onClick={closeForm}
                disabled={saving}
                aria-label="Close form"
              >
                <FaTimes />
              </button>
            </div>

            <form
              className="bulletin-create-form"
              onSubmit={handleSaveBulletin}
            >
              {/* ================= CATEGORY ================= */}

              <div className="bulletin-form-field">
                <label htmlFor="bulletin-category">Content Type</label>

                <select
                  id="bulletin-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  disabled={saving || !!editingBulletin}
                >
                  <option value="internship">Internship Opportunity</option>

                  <option value="useful_info">Important Update</option>
                </select>
              </div>

              {/* ================= COMMON ================= */}

              <div className="bulletin-form-field">
                <label htmlFor="bulletin-title">Title</label>

                <input
                  id="bulletin-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder={
                    category === "internship"
                      ? "Enter internship title"
                      : "Enter update title"
                  }
                  maxLength={150}
                  required
                  disabled={saving}
                />
              </div>

              <div className="bulletin-form-field">
                <label htmlFor="bulletin-description">Description</label>

                <textarea
                  id="bulletin-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder={
                    category === "internship"
                      ? "Describe the internship opportunity..."
                      : "Write the important update..."
                  }
                  rows={6}
                  disabled={saving}
                />
              </div>

              {/* =================================================
                 INTERNSHIP FIELDS
              ================================================= */}

              {category === "internship" && (
                <>
                  <div className="bulletin-form-field">
                    <label htmlFor="internship-organization">
                      Organization / Company
                    </label>

                    <input
                      id="internship-organization"
                      type="text"
                      value={organization}
                      onChange={(event) => setOrganization(event.target.value)}
                      placeholder="e.g. Delhi High Court"
                      disabled={saving}
                    />
                  </div>

                  <div className="bulletin-form-field">
                    <label htmlFor="internship-role">Role</label>

                    <input
                      id="internship-role"
                      type="text"
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      placeholder="e.g. Legal Intern"
                      disabled={saving}
                    />
                  </div>

                  <div className="bulletin-form-field">
                    <label htmlFor="internship-location">Location / Mode</label>

                    <input
                      id="internship-location"
                      type="text"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="e.g. New Delhi / Remote"
                      disabled={saving}
                    />
                  </div>

                  <div className="bulletin-form-field">
                    <label htmlFor="internship-duration">Duration</label>

                    <input
                      id="internship-duration"
                      type="text"
                      value={duration}
                      onChange={(event) => setDuration(event.target.value)}
                      placeholder="e.g. 4 weeks"
                      disabled={saving}
                    />
                  </div>

                  <div className="bulletin-form-field">
                    <label htmlFor="internship-deadline">
                      Application Deadline
                    </label>

                    <input
                      id="internship-deadline"
                      type="date"
                      value={deadline}
                      onChange={(event) => setDeadline(event.target.value)}
                      disabled={saving}
                    />

                    <small>Leave empty if no deadline is available.</small>
                  </div>

                  <div className="bulletin-form-field">
                    <label htmlFor="internship-application-url">
                      Application URL
                    </label>

                    <input
                      id="internship-application-url"
                      type="url"
                      value={applicationUrl}
                      onChange={(event) =>
                        setApplicationUrl(event.target.value)
                      }
                      placeholder="https://..."
                      disabled={saving}
                    />
                  </div>

                  {/* ================= FILE UPLOAD ================= */}

                  <div className="bulletin-form-field">
                    <label htmlFor="bulletin-file">Supporting File</label>

                    <div className="bulletin-file-upload">
                      <input
                        id="bulletin-file"
                        type="file"
                        accept=".pdf,image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleFileChange}
                        disabled={saving}
                      />
                    </div>

                    {uploadedFile && <small>{uploadedFile.name}</small>}

                    {!uploadedFile && existingFileUrl && (
                      <small>
                        Existing file attached. Upload a new file to replace it.
                      </small>
                    )}

                    <small>PDF or image files only.</small>
                  </div>
                </>
              )}

              {/* =================================================
                 IMPORTANT UPDATE
              ================================================= */}

              {category === "useful_info" && (
                <div className="bulletin-form-field">
                  <label htmlFor="update-source-url">
                    Source / Information URL
                  </label>

                  <input
                    id="update-source-url"
                    type="url"
                    value={sourceUrl}
                    onChange={(event) => setSourceUrl(event.target.value)}
                    placeholder="https://..."
                    disabled={saving}
                  />
                </div>
              )}

              {/* ================= ACTIONS ================= */}

              <div className="bulletin-form-actions">
                <button
                  type="button"
                  className="bulletin-form-cancel"
                  onClick={closeForm}
                  disabled={saving}
                >
                  <FaTimes />
                  <span>Cancel</span>
                </button>

                <button
                  type="submit"
                  className="bulletin-form-save"
                  disabled={saving}
                >
                  <FaSave />

                  <span>
                    {saving
                      ? "Saving..."
                      : editingBulletin
                        ? "Save Changes"
                        : "Publish Content"}
                  </span>
                </button>
              </div>
            </form>
          </section>
        )}

        {/* ================= CONTENT ================= */}

        <section className="bulletin-manager-content">
          <div className="bulletin-manager-section-header">
            <div>
              <span className="bulletin-manager-section-eyebrow">CONTENT</span>

              <h2>Internships & Important Updates</h2>
            </div>

            <div className="bulletin-manager-total">
              {bulletins.length}

              <span>{bulletins.length === 1 ? " Item" : " Items"}</span>
            </div>
          </div>

          {/* ================= LOADING ================= */}

          {loading && (
            <div className="bulletin-manager-state">
              <div className="bulletin-manager-state-icon">
                <FaBriefcase />
              </div>

              <h3>Loading content...</h3>

              <p>Fetching internships and important updates.</p>
            </div>
          )}

          {/* ================= EMPTY ================= */}

          {!loading && bulletins.length === 0 && (
            <div className="bulletin-manager-state">
              <div className="bulletin-manager-state-icon">
                <FaBriefcase />
              </div>

              <h3>No content yet</h3>

              <p>Add an internship or important update to get started.</p>
            </div>
          )}

          {/* ================= LIST ================= */}

          {!loading && bulletins.length > 0 && (
            <div className="bulletin-manager-list">
              {bulletins.map((bulletin) => (
                <article
                  className="bulletin-manager-card"
                  key={`${bulletin.category}-${bulletin.id}`}
                >
                  <div className="bulletin-manager-card-main">
                    <div className="bulletin-manager-card-icon">
                      {getCategoryIcon(bulletin)}
                    </div>

                    <div className="bulletin-manager-card-info">
                      <span className="bulletin-manager-card-label">
                        {getCategoryLabel(bulletin)}
                      </span>

                      <h3>{bulletin.title || bulletin.role || "Untitled"}</h3>

                      {bulletin.category === "internship" &&
                        bulletin.organization && (
                          <strong>{bulletin.organization}</strong>
                        )}

                      {bulletin.category === "internship" && bulletin.role && (
                        <span>{bulletin.role}</span>
                      )}

                      <p>
                        {bulletin.description ||
                          "No description has been added."}
                      </p>
                    </div>
                  </div>

                  <div className="bulletin-manager-card-actions">
                    <button
                      type="button"
                      className="bulletin-manager-edit-button"
                      onClick={() => openEditForm(bulletin)}
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      className="bulletin-manager-delete-button"
                      onClick={() => handleDeleteBulletin(bulletin)}
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default BulletinManager;
