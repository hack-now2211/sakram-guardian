import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
  onStrengthChange?: (isValid: boolean) => void;
}

interface PasswordCriteria {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasMinLength: boolean;
}

export default function PasswordStrength({ password, onStrengthChange }: PasswordStrengthProps) {
  const [criteria, setCriteria] = useState<PasswordCriteria>({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinLength: false,
  });

  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const newCriteria: PasswordCriteria = {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      hasMinLength: password.length >= 8,
    };

    setCriteria(newCriteria);

    // Calculate strength percentage
    const validCriteria = Object.values(newCriteria).filter(Boolean).length;
    const strengthPercentage = (validCriteria / 5) * 100;
    setStrength(strengthPercentage);

    // Check if all criteria are met
    const isValid = Object.values(newCriteria).every(Boolean);
    onStrengthChange?.(isValid);
  }, [password, onStrengthChange]);

  const getStrengthLabel = () => {
    if (strength === 0) return "Enter password";
    if (strength <= 20) return "Very Weak";
    if (strength <= 40) return "Weak";
    if (strength <= 60) return "Fair";
    if (strength <= 80) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (strength <= 20) return "bg-destructive";
    if (strength <= 40) return "bg-orange-500";
    if (strength <= 60) return "bg-yellow-500";
    if (strength <= 80) return "bg-blue-500";
    return "bg-secondary";
  };

  if (!password) return null;

  return (
    <div className="space-y-3 mt-2">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Password Strength</span>
          <span className={`font-medium ${strength >= 80 ? 'text-secondary' : 'text-muted-foreground'}`}>
            {getStrengthLabel()}
          </span>
        </div>
        <Progress 
          value={strength} 
          className="h-2"
          style={{
            background: `hsl(var(--muted))`,
          }}
        />
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${strength}%`, position: 'relative', top: '-12px' }}
        />
      </div>

      <div className="grid grid-cols-1 gap-1 text-xs">
        <CriteriaItem 
          met={criteria.hasMinLength} 
          text="At least 8 characters" 
        />
        <CriteriaItem 
          met={criteria.hasUppercase} 
          text="One uppercase letter" 
        />
        <CriteriaItem 
          met={criteria.hasLowercase} 
          text="One lowercase letter" 
        />
        <CriteriaItem 
          met={criteria.hasNumber} 
          text="One number" 
        />
        <CriteriaItem 
          met={criteria.hasSymbol} 
          text="One symbol (!@#$%^&*)" 
        />
      </div>
    </div>
  );
}

function CriteriaItem({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center space-x-2 ${met ? 'text-secondary' : 'text-muted-foreground'}`}>
      {met ? (
        <Check className="h-3 w-3 text-secondary" />
      ) : (
        <X className="h-3 w-3 text-muted-foreground" />
      )}
      <span>{text}</span>
    </div>
  );
}