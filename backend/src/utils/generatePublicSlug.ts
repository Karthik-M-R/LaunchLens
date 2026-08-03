import slugify from "slugify";

const randomSuffix = (
  length = 5
) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

export const generatePublicSlug = (
  campaignName: string
) => {

  const slug = slugify(campaignName, {

    lower: true,

    strict: true,

    trim: true,

  });

  return `${slug}-${randomSuffix()}`;
};