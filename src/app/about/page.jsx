import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { auth } from "@/utils/auth";

const About = async () => {
  return (
    <>
      <h1>Welcome to Families for Christ!</h1>
      <p>
        At Families for Christ, we are dedicated to providing a supportive
        online community for families who share a common faith in Christ. Our
        mission is to strengthen family bonds, deepen spiritual connections, and
        foster a sense of community among like-minded individuals.
      </p>
      <p>
        Through our website, families can access a variety of resources,
        including daily devotionals, family-friendly activities, parenting tips
        rooted in Christian values, and a supportive online forum where members
        can connect, share their experiences, and offer encouragement to one
        another.
      </p>
      <p>
        We believe that by building strong family foundations on the teachings
        of Christ, we can create lasting bonds, instill values that endure, and
        navigate life&apos;s challenges with faith and resilience.
      </p>
      <p>
        Join us at Families for Christ and be a part of a community that
        uplifts, inspires, and supports one another on our shared journey of
        faith and family.
      </p>
    </>
  );
};

export default About;
