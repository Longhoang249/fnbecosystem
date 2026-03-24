import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registrationValidator } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for handling workshop registrations
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = registrationValidator.parse(req.body);
      const registration = await storage.createRegistration(validatedData);
      
      return res.status(201).json({
        success: true,
        message: "Đăng ký thành công!",
        data: registration
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "Dữ liệu không hợp lệ",
          errors: validationError.details
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi đăng ký"
      });
    }
  });

  // API route to get all registrations (for admin purposes)
  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      return res.status(200).json({
        success: true,
        data: registrations
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi lấy danh sách đăng ký"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
