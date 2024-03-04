"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

import { useRouter } from "next/navigation";
import { toTitleCase } from "@/utils/logic";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export const UpdateUser = ({ session }) => {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [bio, setTitle] = useState("");
  const [percent, setPercent] = useState(0);
  const router = useRouter();
  //const [state, formAction] = useFormState(addUser, undefined);

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
          console.log("Upload is " + progress + "% done");
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

  const handleSubmit = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        bio: bio,
        image: media,
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.refresh("/dashboard");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">UPDATE USER DETAILS</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>UPDATE USER DETAILS</DialogTitle>
          <DialogDescription>Update your details.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Progress value={percent} className="w-[100%]" />
            <Label htmlFor="image">Picture</Label>
            <Input
              id="image"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="bio">User Bio</Label>

            <Textarea
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type your bio here."
              id="bio"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
