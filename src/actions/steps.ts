"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";

// ===== First Step =====
export const getFirstStepByOrganizationId = async (organizationId: string) => {
  return await db.firstStep.findUnique({
    where: { organizationId },
  });
};

export const updateFirstStepByOrganizationId = async (
  organizationId: string,
  newData: any
) => {
  return await db.firstStep.update({
    where: { organizationId },
    data: { data: newData },
  });
};

// ===== Second Step =====
export const getSecondStepByOrganizationId = async (organizationId: string) => {
  return await db.secondStep.findUnique({
    where: { organizationId },
  });
};

export const updateSecondStepByOrganizationId = async (
  organizationId: string,
  newData: any
) => {
  return await db.secondStep.update({
    where: { organizationId },
    data: { data: newData },
  });
};

// ===== Third Step =====
export const getThirdStepByOrganizationId = async (organizationId: string) => {
  return await db.thirdStep.findUnique({
    where: { organizationId },
  });
};

export const updateThirdStepByOrganizationId = async (
  organizationId: string,
  newData: any
) => {
  return await db.thirdStep.update({
    where: { organizationId },
    data: { data: newData },
  });
};

// ===== Fourth Step =====
export const getFourthStepByOrganizationId = async (organizationId: string) => {
  return await db.fourthStep.findUnique({
    where: { organizationId },
  });
};

export const updateFourthStepByOrganizationId = async (
  organizationId: string,
  newData: any
) => {
  return await db.fourthStep.update({
    where: { organizationId },
    data: { data: newData },
  });
};
