import { DeviceType } from "@prisma/client";

export const detectDevice = (
  userAgent: string
): DeviceType => {

  const ua =
    userAgent.toLowerCase();

  if (
    ua.includes("mobile")
  ) {
    return DeviceType.MOBILE;
  }

  if (
    ua.includes("tablet") ||
    ua.includes("ipad")
  ) {
    return DeviceType.TABLET;
  }

  return DeviceType.DESKTOP;
};