import { useEffect, useMemo, useState, useRef } from "react";
import { X } from "lucide-react";

const createEmptyForm = () => ({
  id: undefined,
  name: "",
  email: "",
  phone: "",
  address: "",
  title: "",
  company: "",
  website: "",
  notes: "",
  avatar: "",
});

const buildInitialState = (contact) => ({
  ...createEmptyForm(),
  ...(contact ?? {}),
});

const sanitizeFormData = (formData) => {
  const next = {};
  Object.entries(formData).forEach(([key, value]) => {
    next[key] = typeof value === "string" ? value.trim() : value;
  });
  return next;
};

const validateForm = (data) => {
  const nextErrors = {};
  if (!data.name) nextErrors.name = "Name is required";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    nextErrors.email = "Invalid email format";
  }
  if (data.phone && !/^[\d\s()+-]+$/.test(data.phone)) {
    nextErrors.phone = "Invalid phone format";
  }
  if (
    data.website &&
    !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[^\s]*)?$/i.test(data.website)
  ) {
    nextErrors.website = "Invalid website URL";
  }
  if (data.avatar && !/^https?:\/\//i.test(data.avatar)) {
    nextErrors.avatar = "Avatar must be a valid URL";
  }
  return nextErrors;
};

export default function AddContactForm({
  isOpen,
  onSubmit,
  onCancel,
  initialContact,
  mode = "create",
}) {
  const [formData, setFormData] = useState(() =>
    buildInitialState(initialContact)
  );
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    setFormData(buildInitialState(initialContact));
    setErrors({});
  }, [initialContact, mode]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      setTimeout(() => {
        if (modalRef.current) {
          const firstInput =
            modalRef.current.querySelector('input[type="text"]');
          firstInput?.focus();
        }
      }, 100);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isEditMode = mode === "edit";

  const heading = useMemo(
    () => (isEditMode ? "Update Contact" : "Add New Contact"),
    [isEditMode]
  );

  const submitLabel = useMemo(
    () => (isEditMode ? "Save Changes" : "Add Contact"),
    [isEditMode]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const sanitized = sanitizeFormData(formData);
    const validationErrors = validateForm(sanitized);

    if (Object.keys(validationErrors).length === 0) {
      if (isEditMode) {
        const payload = {
          ...(initialContact ?? {}),
          ...sanitized,
          id: initialContact?.id ?? sanitized.id,
        };
        onSubmit(payload);
        setFormData(buildInitialState(payload));
      } else {
        const { id: _id, ...rest } = sanitized;
        onSubmit(rest);
        setFormData(createEmptyForm());
      }
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
    >
      <div
        className="modal-panel form-modal-panel"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancel}
          className="modal-close"
          aria-label="Close form"
        >
          <X size={20} />
        </button>

        <div className="modal-header">
          <div>
            <h2 id="form-modal-title" className="modal-title">
              {heading}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label" htmlFor="contact-name">
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`form-input${errors.name ? " has-error" : ""}`}
                autoComplete="name"
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="contact-title">
                Title
              </label>
              <input
                id="contact-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Marketing Manager"
                className="form-input"
                autoComplete="organization-title"
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="contact-company">
                Company
              </label>
              <input
                id="contact-company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company or team"
                className="form-input"
                autoComplete="organization"
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`form-input${errors.email ? " has-error" : ""}`}
                autoComplete="email"
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="contact-phone">
                Phone
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className={`form-input${errors.phone ? " has-error" : ""}`}
                autoComplete="tel"
              />
              {errors.phone && <p className="form-error">{errors.phone}</p>}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="contact-website">
                Website
              </label>
              <input
                id="contact-website"
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className={`form-input${errors.website ? " has-error" : ""}`}
                autoComplete="url"
              />
              {errors.website && <p className="form-error">{errors.website}</p>}
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="contact-address">
              Address
            </label>
            <textarea
              id="contact-address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City, State"
              className="form-textarea"
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="contact-notes">
              Notes
            </label>
            <textarea
              id="contact-notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Visibility preferences, follow-up reminders, etc."
              className="form-textarea"
              rows={4}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="contact-avatar">
              Profile Image URL
            </label>
            <input
              id="contact-avatar"
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className={`form-input${errors.avatar ? " has-error" : ""}`}
            />
            {errors.avatar && <p className="form-error">{errors.avatar}</p>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {submitLabel}
            </button>
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
