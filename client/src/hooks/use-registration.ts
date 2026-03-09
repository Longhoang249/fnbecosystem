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
    },
  });

  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    isRegistering: mutation.isPending,
    error: mutation.error,
  };
}
