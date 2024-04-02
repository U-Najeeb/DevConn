import sharp from "sharp";
import fs from "fs";

const processImage = async (
  base64Image: string,
  fName?: string,
  lName?: string
): Promise<string> => {
  try {
    const buffer = Buffer.from(base64Image, "base64");
    const imageMetadata = await sharp(buffer).metadata();

    const resizeImage = await sharp(buffer)
      .resize({ fit: "inside", width: 800, height: 800 })
      .png({ quality: 90 })
      .toBuffer();

    const png_format = `${fName}_${lName}_${Date.now()}.png`;
    const filePath = `./static/profilePictures/${png_format}`;

    fs.writeFileSync(filePath, resizeImage);
    return png_format;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

export default processImage;
