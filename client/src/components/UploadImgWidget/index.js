import React from "react";
import PropTypes from "prop-types";
import { openUploadWidget } from "../../util/Cloudinary/CloudinaryService";
import "./style.css";

export default function UploadImgWidget({ setImgUrl, folderName, className }) {
  const uploadImageWidget = () => {
    let myWidget = openUploadWidget(
      {
        cloudName: process.env.CLOUD_NAME,
        uploadPreset: process.env.UPLOAD_PRESET,
        folder: `${folderName}`,
        cropping: true,
        sources: ["local", "url", "camera", "google_drive", "facebook"],
        showAdvancedOptions: false,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#CCCCCB",
            windowBorder: "#13753B",
            tabIcon: "#F9A01B",
            menuIcons: "#5A616A",
            textDark: "#13753B",
            textLight: "#F9A01B",
            link: "#F9A01B",
            action: "#FF620C",
            inactiveTabIcon: "#13753B",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#D8D8D8",
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImgUrl(result.info.secure_url);
        }
      }
    );
    myWidget.open();
  };

  return (
    <p className={`${className} upload-img`} onClick={uploadImageWidget}>
      Upload Photo
    </p>
  );
}
UploadImgWidget.propTypes = {
  setImgUrl: PropTypes.func.isRequired,
  folderName: PropTypes.string.isRequired,
  className: PropTypes.string,
};
