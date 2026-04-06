import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  ticketCount: text("ticket_count").notNull().default("1"),
  message: text("message"),
  email: text("email"),
  company: text("company"),
  position: text("position"),
  interest: text("interest"),
  createdAt: text("created_at").notNull().default("now()"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRegistrationSchema = createInsertSchema(registrations).pick({
  fullName: true,
  phone: true,
  ticketCount: true,
  message: true,
  email: true,
  company: true,
  position: true,
  interest: true,
});

export const phoneValidator = z.string().regex(/^[0-9]{10,11}$/, {
  message: "Số điện thoại phải có 10-11 chữ số",
});

export const registrationValidator = insertRegistrationSchema.extend({
  phone: phoneValidator,
  ticketCount: z.string().regex(/^[0-9]+$/, { message: "Số lượng vé phải là số" }),
  email: z.string().email({ message: "Email không hợp lệ" }).optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
