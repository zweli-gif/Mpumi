import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from '@phosphor-icons/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-soil/60 z-[200] flex items-end lg:items-center justify-center animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-t-[14px] lg:rounded-[14px] w-full max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col animate-slide-up lg:animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-canvas-dark sticky top-0 bg-white">
          <h2 className="font-heading text-base font-semibold text-soil">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-soil-muted hover:text-soil rounded-lg hover:bg-canvas-dark transition-colors"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4 overflow-y-auto flex-1">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-4 py-3.5 border-t border-canvas-dark flex gap-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Form field components
interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

export function FormGroup({ children, className = '' }: FormGroupProps) {
  return <div className={`mb-3.5 ${className}`}>{children}</div>;
}

interface FormLabelProps {
  children: ReactNode;
  required?: boolean;
}

export function FormLabel({ children, required }: FormLabelProps) {
  return (
    <label className="block text-[10px] font-semibold text-soil-muted uppercase mb-1.5">
      {children}
      {required && <span className="text-error"> *</span>}
    </label>
  );
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function FormInput({ className = '', ...props }: FormInputProps) {
  return (
    <input
      className={`w-full border border-soil/20 rounded-lg px-3 py-2.5 text-sm text-soil bg-canvas focus:outline-none focus:border-balloon ${className}`}
      {...props}
    />
  );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export function FormSelect({ children, className = '', ...props }: FormSelectProps) {
  return (
    <select
      className={`w-full border border-soil/20 rounded-lg px-3 py-2.5 text-sm text-soil bg-canvas focus:outline-none focus:border-balloon ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function FormTextarea({ className = '', ...props }: FormTextareaProps) {
  return (
    <textarea
      className={`w-full border border-soil/20 rounded-lg px-3 py-2.5 text-sm text-soil bg-canvas resize-none min-h-[70px] focus:outline-none focus:border-balloon ${className}`}
      {...props}
    />
  );
}
