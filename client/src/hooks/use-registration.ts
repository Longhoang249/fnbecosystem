import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { type InsertRegistration } from "@shared/schema";

interface RegistrationResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];
}

export function useRegistration() {
  const mutation = useMutation({
    mutationFn: async (registrationData: InsertRegistration) => {
      const response = await apiRequest("POST", "/api/register", registrationData);
      return response.json() as Promise<RegistrationResponse>;
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["/api/registrations"] });

      // Facebook Pixel - Track registration as Lead conversion
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'F&B Connect 2026 Registration',
          content_category: 'Event Registration',
        });
      }
    },
  });

  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    isRegistering: mutation.isPending,
    error: mutation.error,
  };
}
