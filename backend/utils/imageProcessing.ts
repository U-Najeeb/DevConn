import sharp from "sharp";
import fs from "fs";

const processImage = async (
  fName: string,
  lName: string,
  base64Image: string
): Promise<string> => {
  const buffer = Buffer.from(base64Image, "base64");

  const resizeImage = await sharp(buffer)
    .resize({ fit: "inside", width: 800, height: 800 })
    .png({ quality: 90 })
    .toBuffer();

  const png_format = `${`${fName}_${lName}` + Date.now() + ".png"}`;
  fs.writeFileSync(`./static/profilePictures/${png_format}`, resizeImage);
  return png_format;
};

export default processImage;
