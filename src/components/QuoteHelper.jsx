import { useState, useId } from 'react';

// Web3Forms submission target. Swap the placeholder for the real key in
// .env (or directly here for now). Get one at https://web3forms.com/ —
// 250 free submissions/month, no server required.
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_KEY';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export default function QuoteHelper({ context = '' }) {
  const nameId = useId();
  const phoneId = useId();
  const itemsId = useId();
  const photoId = useId();
  const statusId = useId();

  const [state, setState] = useState({ status: 'idle', error: null });

  async function handleSubmit(event) {
    event.preventDefault();
    setState({ status: 'submitting', error: null });

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', `Dakota Valley quote — ${formData.get('name') || 'new lead'}`);
    formData.append('from_name', 'Dakota Valley Junk Removal');
    if (context) formData.append('source_page', context);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (data.success) {
        setState({ status: 'success', error: null });
        form.reset();
      } else {
        setState({ status: 'error', error: data.message || 'Submission failed. Please text us at (952) 232-5107.' });
      }
    } catch (err) {
      setState({ status: 'error', error: 'Network error. Please text us at (952) 232-5107.' });
    }
  }

  if (state.status === 'success') {
    return (
      <div className="quote-helper-success" role="status" aria-live="polite">
        <h3>Quote request sent ✓</h3>
        <p>
          Thanks. The crew will text back within a few hours with a firm
          quote and an available pickup window confirmed with the crew. For faster confirmation, you can
          also text (952) 232-5107 directly.
        </p>
        <button
          type="button"
          className="button secondary"
          onClick={() => setState({ status: 'idle', error: null })}
        >
          Send another request
        </button>
      </div>
    );
  }

  const isSubmitting = state.status === 'submitting';

  return (
    <form className="quote-helper-form" onSubmit={handleSubmit} noValidate>
      <p className="quote-helper-intro">
        Three fields. Photo optional. We'll text back within a few hours.
      </p>

      <div className="quote-helper-field">
        <label htmlFor={nameId}>Name</label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          autoComplete="name"
          disabled={isSubmitting}
        />
      </div>

      <div className="quote-helper-field">
        <label htmlFor={phoneId}>Phone number</label>
        <input
          id={phoneId}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="(xxx) xxx-xxxx"
          disabled={isSubmitting}
        />
      </div>

      <div className="quote-helper-field">
        <label htmlFor={itemsId}>What do you need removed?</label>
        <textarea
          id={itemsId}
          name="items"
          rows={3}
          required
          placeholder="e.g., One sofa and two mattresses, all in the garage."
          disabled={isSubmitting}
        />
      </div>

      <div className="quote-helper-field quote-helper-field-photo">
        <label htmlFor={photoId}>
          Photo <span className="quote-helper-optional">(optional but helpful)</span>
        </label>
        <input
          id={photoId}
          name="photo"
          type="file"
          accept="image/*"
          capture="environment"
          disabled={isSubmitting}
        />
      </div>

      {/* Honeypot — hidden from real users, traps spam bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: 'none' }}
      />

      <button
        type="submit"
        className="button primary quote-helper-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending…' : 'Send quote request'}
      </button>

      <p
        id={statusId}
        className="quote-helper-status"
        role="status"
        aria-live="polite"
      >
        {state.status === 'error' && state.error}
      </p>

      <p className="quote-helper-fallback">
        Prefer to text? Send photos directly to{' '}
        <a href="sms:+19522325107">(952) 232-5107</a>.
      </p>
    </form>
  );
}
