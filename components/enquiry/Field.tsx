"use client";

import { useId, type ReactNode } from "react";
import type { SelectOption } from "@/data/enquiry";
import { cn } from "@/lib/utils";

/**
 * Form field primitives for the trade enquiry.
 *
 * Styled as ruled lines rather than boxed inputs — the form should read like a
 * document being filled in, not a stack of UI controls. Labels are always
 * visible (never placeholder-as-label), which is both an accessibility
 * requirement and, at this scale of type, the more editorial choice.
 *
 * `<select>` stays native. On Android and iOS the system picker is faster and
 * more reliable than any custom listbox, and it costs no JavaScript.
 */

const CONTROL_BASE =
  "w-full appearance-none rounded-none border-0 border-b bg-transparent px-0 py-3 text-on-light transition-colors duration-300 ease-brand placeholder:text-on-light-muted/55";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (ids: { describedBy: string | undefined; invalid: boolean }) => ReactNode;
}

function FieldShell({
  id,
  label,
  required,
  error,
  hint,
  className,
  children,
}: FieldShellProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  /* An error supersedes the hint — stacking both puts two lines of small text
     under one control and buries the thing that needs acting on. */
  const showHint = Boolean(hint) && !error;
  const describedBy =
    [showHint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={id}
        className={cn(
          "label-xs block transition-colors duration-300 ease-brand",
          error ? "text-brass-deep" : "text-on-light-muted",
        )}
      >
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="text-brass-deep">
              {" *"}
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>

      {children({ describedBy, invalid: Boolean(error) })}

      {showHint ? (
        <p id={hintId} className="mt-2 text-xs text-on-light-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-xs font-medium text-brass-deep"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  error?: string;
  hint?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  defaultValue?: string;
  className?: string;
}

export function TextField({
  name,
  label,
  type = "text",
  required,
  error,
  hint,
  autoComplete,
  inputMode,
  defaultValue,
  className,
}: TextFieldProps) {
  const id = useId();

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      {({ describedBy, invalid }) => (
        <input
          id={id}
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            CONTROL_BASE,
            invalid
              ? "border-brass-deep"
              : "border-paper-line focus:border-brass-deep",
          )}
        />
      )}
    </FieldShell>
  );
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: readonly SelectOption[];
  /** Shown as the empty first option. */
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function SelectField({
  name,
  label,
  options,
  placeholder = "Select",
  required,
  error,
  hint,
  defaultValue,
  className,
  onChange,
}: SelectFieldProps) {
  const id = useId();

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      {({ describedBy, invalid }) => (
        <div className="relative">
          <select
            /*
              Keyed on the default so the element is recreated when the server
              echoes a value back. Unlike an <input>, a <select> has no `value`
              attribute for React to update in place — the default lives on the
              <option>'s `selected` attribute, which is also what a form reset
              restores to. Without the remount, every select silently clears
              itself after a validation error while the text fields keep their
              values.
            */
            key={defaultValue ?? ""}
            id={id}
            name={name}
            defaultValue={defaultValue ?? ""}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={onChange ? (event) => onChange(event.target.value) : undefined}
            className={cn(
              CONTROL_BASE,
              "cursor-pointer pr-8",
              invalid
                ? "border-brass-deep"
                : "border-paper-line focus:border-brass-deep",
            )}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 top-1/2 block h-1.5 w-1.5 -translate-y-2/3 rotate-45 border-b border-r border-on-light-muted"
          />
        </div>
      )}
    </FieldShell>
  );
}

interface TextAreaFieldProps {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  error?: string;
  hint?: string;
  defaultValue?: string;
  className?: string;
}

export function TextAreaField({
  name,
  label,
  rows = 4,
  required,
  error,
  hint,
  defaultValue,
  className,
}: TextAreaFieldProps) {
  const id = useId();

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      {({ describedBy, invalid }) => (
        <textarea
          id={id}
          name={name}
          rows={rows}
          defaultValue={defaultValue}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            CONTROL_BASE,
            "resize-y leading-relaxed",
            invalid
              ? "border-brass-deep"
              : "border-paper-line focus:border-brass-deep",
          )}
        />
      )}
    </FieldShell>
  );
}
