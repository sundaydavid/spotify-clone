import { cloudinary_upload_preset } from "../utils/config";
import { openUploadWidget } from "../utils/CloudinaryService";

const CloudinaryUpload = ({ setUrl, setName }) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dh3p0s6gc",
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename)
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className=" bg-white text-black rounded-full p-4 font-semibold text-lg"
      onClick={uploadImageWidget}
    >
      Select track
    </button>
  );
};

export default CloudinaryUpload;
