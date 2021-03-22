import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../public/css/components/Thumbnail.module.css";

interface PreviewProps {
  file: any;
}

export const Preview: React.FC<PreviewProps> = ({ file }) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<any | null>(
    "https://cdn.discordapp.com/attachments/647989725247963139/811778237348315216/1613611206298.png"
  );

  useEffect(() => {
    if (!file) return;

    setLoading(true);
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      setLoading(false);
      setThumbnail(fileReader.result);
      console.log(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, []);

  if (!file) return null;
  if (loading) return <p>loading...</p>;

  return (
    <Image
      src={thumbnail}
      alt={file.name}
      className={styles.thumbnail}
      height={250}
      width={250}
    />
  );
};

export default Preview;
