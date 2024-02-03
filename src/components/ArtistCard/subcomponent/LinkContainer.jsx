import React from "react";
import classNames from "classnames/bind";
import styles from "../style.module.css";
import { useArtistCardContext } from "../ArtistCardContext";
import { IconContext } from "react-icons";

import { motion } from "framer-motion";
import DMButton from "./DMButton";
import { processLink } from "../../../helper/processLink";
import LinkIcon from "../../LinkIcon/LinkIcon";

const LinkContainer = () => {
  const sx = classNames.bind(styles);
  const data = useArtistCardContext();
  let link = processLink(data.Facebook_link, data.Facebook_name, "Facebook");
  link = link.concat(
    processLink(data.Instagram_link, data.Instagram_name, "Instagram")
  );
  link = link.concat(processLink(data.PIXIV_link, data.PIXIV_name, "Pixiv"));
  link = link.concat(processLink(data.Twitch_link, data.Twitch_name, "Twitch"));
  link = link.concat(
    processLink(data.Twitter_link, data.Twitter_name, "Twitter")
  );
  link = link.concat(
    processLink(data.Youtube_link, data.Youtube_name, "Youtube")
  );
  link = link.concat(processLink(data.Plurk_link, data.Plurk_name, "Plurk"));
  link = link.concat(processLink(data.Baha_link, data.Baha_name, "Baha"));
  link = link.concat(processLink(data.other_website, "官網", "Other"));

  return (
    <div className={sx("linkContainer")}>
      <IconContext.Provider
        value={{
          verticalAlign: "middle",
          color: "#CBC3C3",
          size: "1.5rem",
        }}
      >
        <DMButton />
        {link.map((item, index) => (
          <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={sx("linkButton")}
            key={item + index}
            whileHover={{
              backgroundColor: "#4D4D4D",
            }}
          >
            <div className={sx("linkIcon")}>
              <LinkIcon key={index} data={item} />
            </div>
            {item.name}
          </motion.a>
        ))}
      </IconContext.Provider>
    </div>
  );
};

export default LinkContainer;
