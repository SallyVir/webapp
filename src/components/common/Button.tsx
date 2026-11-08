import type { ComponentPropsWithRef, ReactNode } from 'react';

export type ButtonVariant =
    | 'primary'
    | 'danger'
    | 'secondary'
    | 'success'
    | 'light'
    | 'dark'
    | 'link'
    | 'outline-primary'
    | 'outline-danger'
    | 'outline-secondary'
    | 'outline-dark';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;

    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const SIZE_CLASS: Record<ButtonSize, string> = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
};

export default function Button({
                                   variant = 'danger',
                                   size = 'md',
                                   loading = false,
                                   fullWidth = false,
                                   leftIcon,
                                   rightIcon,
                                   disabled,
                                   type = 'button',
                                   className = '',
                                   children,
                                   ...rest
                               }: ButtonProps) {
    const classes = [
        'btn',
        `btn-${variant}`,
        SIZE_CLASS[size],
        fullWidth ? 'w-100' : '',
        'd-inline-flex align-items-center justify-content-center gap-2',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            {...rest}
        >
            {loading ? (
                <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                />
            ) : (
                leftIcon
            )}
            {children}
            {!loading && rightIcon}
        </button>
    );
}