import React from "react";
import styles from "./style.module.css";
import { motion } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";
import classNames from "classnames/bind";
import { useCollection } from "../../hooks/useCollection";
import ArtistCardContext from "./ArtistCardContext";
import ImageContainer from "./subcomponent/imageContainer";
import TitleContainer from "./subcomponent/TitleContainer";
import BookmarkContainer from "./subcomponent/BookmarkContainer";
import TagContainer from "./subcomponent/TagContainer";
import DayContainer from "./subcomponent/DayContainer";
import LinkContainer from "./subcomponent/LinkContainer";
const ArtistCard = React.forwardRef(({ data, passRef }, ref) => {
  const collection = useCollection((state) => state.collection);
  console.log(collection);
  const sx = classNames.bind(styles);  
  return (
    <ArtistCardContext.Provider value={data}>
      <motion.div ref={passRef} className={sx("artistCard")}>
        <motion.div className={sx("mainContainer")}>
          <ImageContainer />
          <div className={sx("rightContainer")}>
            <div className={sx("firstRow")}>
              <TitleContainer />
              <BookmarkContainer />
            </div>
            <TagContainer />
            <DayContainer />
            <LinkContainer/>
          </div>
        </motion.div>
      </motion.div>
    </ArtistCardContext.Provider>
  );
});

export default ArtistCard;
