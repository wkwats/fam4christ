"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = ({ searchParams }) => {
  const { category } = searchParams;

  const router = useRouter();
  const [percent, setPercent] = useState(0);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(progress);
          // console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        tags,
        img: media,
        slug: slugify(title),
        catSlug: category,
      }),
    });

    if (res.status === 200) {
      const data = await res.json();

      router.push(`/blog/${data.slug}`);
    }
  };

  const toolbarOptions = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      {percent > 20 && (
        <div className="mb-2 mt-2">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-green-700 dark:text-white">
              Image Upload
            </span>
            <span className="text-sm font-medium text-green-700 dark:text-white">
              {percent}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className={styles.btncontainer}>
        <div className={styles.button} onClick={() => setOpen(!open)}>
          <Image
            className={styles.uploadedimg}
            src={media ? media : "/no-image.png"}
            alt="uploaded image"
            width={150}
            height={150}
          />
        </div>
        <div className={styles.btns}>
          {open && (
            <div className={styles.add}>
              <input
                type="file"
                id="image"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <button className={styles.addButton}>
                <label className={styles.addBtnLabel} htmlFor="image">
                  <Image src="/upload.png" alt="" width={30} height={30} />
                  <span className={styles.addBtnText}>Upload</span>
                </label>
              </button>
              <button className={styles.addButton}>
                <div className={styles.addBtnLabel}>
                  <Image src="/image.png" alt="" width={30} height={30} />
                  <span className={styles.addBtnText}>PhotoURL</span>
                </div>
              </button>
            </div>
          )}
        </div>

        <div className={styles.tagscontainer}>
          {tags?.map((tag, index) => {
            return (
              <div className={styles.tag} key={index}>
                <span className={styles.tagname}>{tag}</span>
                <div
                  onClick={() => removeTag(index)}
                  className={styles.tagclose}
                >
                  x
                </div>
              </div>
            );
          })}
          <input
            onKeyDown={handleKeyDown}
            className={styles.tagsinput}
            type="text"
            placeholder="Tag your post.."
          />
        </div>
      </div>

      <div className={styles.editor}>
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          modules={toolbarOptions}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
