"use client";
import { useState } from "react";
import Link from "next/link";
import { SignedOut, SignInButton,SignUpButton, UserButton } from "@clerk/nextjs";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [cid, setCid] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setFileUrl(data.url || "Error uploading file");
      const cidResponse = await fetch("/api/queue");
      const cidData = await cidResponse.json();
      console.log(cidData);
      // const hfverify = await fetch(
      //   "https://hfvalidation-api.vercel.app/check_model?repo_id=DEEPAK70681/sendIntentModelTHEOGv1"
      // );

      // if (hfverify.ok) {
      //   const result = await hfverify.json();
      //   console.log("Result:", result);
      // } else {
      //   console.error("Failed to fetch:", hfverify.status, hfverify.statusText);
      // }

      if (cidResponse.ok) {
        setCid(cidData.cid || "No CID found");
      } else {
        setCid("Error fetching CID");
      }
    } catch (error) {
      console.error("Error during file upload or CID fetch", error);
      setFileUrl("Error uploading file");
      setCid("Error fetching CID");
    }
  };

  return (
    <>
    <div className="absolute top-0 left-0 right-0">
    <img src="script.png" className="relative h-screen w-lvw object-cover" />
    </div>
    <div className="">
 
    
    <img src="/logo.png" alt="Logo" className="w-96 absolute top-0 left-0" /> 
    <div className="abolute flex flex-col justify-center items-center h-screen space-y-8">



        
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter text-center pl-44 z-50">
        <span className="bg-clip-text text-transparent font-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-500 border-white">
          Upload your Python scripts
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 space-x-6 text-center ml-20 z-50">
        <input
          className="border border-gray-300 p-3 rounded-md"
          type="file"
          accept=".py"
          onChange={handleFileChange}
          required
        />
        {/* <button
          type="submit"
          className="bg-[#4FD1c5] text-white p-3 rounded-md hover:bg-blue-500 z-50"
        >
          Upload
        </button> */}
        <div className="w-[156px] h-14 px-[33px] bg-gradient-to-bl from-[#18c7ff] to-[#933ffd] rounded-[10px] border border-white justify-center items-center inline-flex">
    <div className="text-center text-white text-xl font-semibold font-['Inter'] leading-none">
    <button
          type="submit"
          // className="bg-[#4FD1c5] text-white p-3 rounded-md hover:bg-blue-500 z-50"
        >
          Upload
        </button>
    </div>
</div>
      </form>


      {/* {fileUrl && (
        <p className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 mt-3">
          Uploaded File URL:{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </p>
      )} */}
      

      {cid && (
        <p className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 border-white mt-3 z-50">
          CID : {cid}
        </p>
      )}
     
    </div>
    </div>
    </>
  );
};

export default UploadForm;
