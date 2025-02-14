import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";

function Upload() {
  const [design, setDesign] = useState("");
  const [front, setFront] = useState("");
  const [depth, setDepth] = useState("");
  const [industry, setIndustry] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!front || !depth || isNaN(front) || isNaN(depth)) {
      setErrorMessage("Please enter valid numbers for both front and depth.");
      setLoading(false);
      return;
    }

    const frontDepth = `${front} X ${depth}`;
    const formData = new FormData();
    formData.append("design", design);
    formData.append("front_depth", frontDepth);
    formData.append("industry", industry);
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      await axios.post("https://api.dbzmanager.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Files uploaded successfully.");
      navigate("/upload");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "There was an error submitting the form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-body">
      <Header />
      <main className="flex flex-col justify-center items-center min-h-[80vh] text-center p-8">
        <h2 className="text-4xl font-heading font-extrabold text-black mb-5">
          Upload Your 3D Model
        </h2>

        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col">
              <label htmlFor="design" className="text-lg font-bold mb-2">
                Layout
              </label>
              <select
                id="design"
                value={design}
                onChange={(e) => setDesign(e.target.value)}
                className="border-2 border-gray-300 p-3 rounded-md font-bold"
              >
                <option value="">Select Layout</option>
                <option value="1 side open">1 Side Open</option>
                <option value="2 side open">2 Side Open</option>
                <option value="3 side open">3 Side Open</option>
                <option value="4 side open">4 Side Open</option>
              </select>
            </div>

            <div className="flex justify-center space-x-5">
              <div className="flex flex-col w-1/3">
                <label htmlFor="front" className="text-lg font-bold mb-2">
                  Front Size
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="front"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    placeholder="Enter front size"
                    className="border-2 border-gray-300 p-3 rounded-md font-bold w-full"
                  />
                  <span className="font-bold">X</span>
                </div>
              </div>

              <div className="flex flex-col w-1/3">
                <label htmlFor="depth" className="text-lg font-bold mb-2">
                  Depth Size
                </label>
                <input
                  type="number"
                  id="depth"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  placeholder="Enter depth size"
                  className="border-2 border-gray-300 p-3 rounded-md font-bold w-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="industry" className="text-lg font-bold mb-2">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Enter industry"
                className="border-2 border-gray-300 p-3 rounded-md font-bold"
              />
            </div>

            <div className="flex space-x-5">
              <div className="flex flex-col w-1/2">
                <label className="text-lg font-bold mb-2">Upload 3D File</label>
                <div className="flex items-center mb-5">
                  <FaCloudUploadAlt size={50} className="text-red-600 mr-4" />
                  <input
                    type="file"
                    className="file:border-2 file:border-teal-500 file:py-2 file:px-4 file:rounded-full file:text-teal-700 file:bg-white file:hover:bg-teal-100"
                    onChange={handleFile1Change}
                    accept=".max"
                  />
                </div>
              </div>

              <div className="flex flex-col w-1/2">
                <label className="text-lg font-bold mb-2">
                  Upload JPEG Image
                </label>
                <div className="flex items-center mb-5">
                  <FaCloudUploadAlt size={50} className="text-blue-600 mr-4" />
                  <input
                    type="file"
                    className="file:border-2 file:border-teal-500 file:py-2 file:px-4 file:rounded-full file:text-teal-700 file:bg-white file:hover:bg-teal-100"
                    onChange={handleFile2Change}
                    accept="image/jpeg"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold font-bold hover:bg-red-700 transition-all"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>

          {errorMessage && (
            <div className="mt-4 text-red-600 font-semibold">
              {errorMessage}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Upload;
