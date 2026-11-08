import { useId, useState } from 'react';
import type { ComponentPropsWithRef } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    inputSize?: InputSize;
    showPasswordToggle?: boolean;
    wrapperClassName?: string;
}

const SIZE_CLASS: Record<InputSize, string> = {
    sm: 'form-control-sm',
    md: '',
    lg: 'form-control-lg',
};
export default function Input({
                                  label,
                                  error,
                                  hint,
                                  inputSize = 'md',
                                  showPasswordToggle = true,
                                  wrapperClassName = '',
                                  id,
                                  type = 'text',
                                  className = '',
                                  required,
                                  ...rest
                              }: InputProps) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isPassword = type === 'password';
    const hasToggle = isPassword && showPasswordToggle;
    const actualType = isPassword && showPassword ? 'text' : type;

    const describedBy = [error ? errorId : '', hint && !error ? hintId : '']
        .filter(Boolean)
        .join(' ');

    const inputClasses = [
        'form-control',
        SIZE_CLASS[inputSize],
        error ? 'is-invalid' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const inputElement = (
        <input
            id={inputId}
            type={actualType}
            className={inputClasses}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy || undefined}
            {...rest}
        />
    );

    return (
        <div className={`mb-3 ${wrapperClassName}`.trim()}>
            {label && (
                <label htmlFor={inputId} className="form-label fw-semibold">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            {hasToggle ? (
                <div className="input-group">
                    {inputElement}
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        aria-pressed={showPassword}
                    >
                        {showPassword ? 'Ẩn' : 'Hiện'}
                    </button>
                </div>
            ) : (
                inputElement
            )}

            {error && (
                <div id={errorId} className="invalid-feedback d-block" role="alert">
                    {error}
                </div>
            )}
            {hint && !error && (
                <div id={hintId} className="form-text">
                    {hint}
                </div>
            )}
        </div>
    );
}