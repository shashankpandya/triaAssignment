import { useState } from "react";
import { X } from "lucide-react";

export default function AddContactForm({ onAddContact, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    company: "",
    website: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.phone && !/^[\d\s()+-]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone format";
    }
    if (
      formData.website &&
      !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[^\s]*)?$/i.test(formData.website)
    ) {
      newErrors.website = "Invalid website URL";
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onAddContact(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        title: "",
        company: "",
        website: "",
        notes: "",
      });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section className="panel form-panel" aria-label="Add new contact">
      <div className="form-header">
        <div>
          <h2 className="form-title">Add New Contact</h2>
          <p className="form-description">
            Capture the essentials so your contact list stays up to date and
            easy to scan.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="form-close"
          aria-label="Close add contact form"
        >
          <X size={22} />
        </button>
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

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Add Contact
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
