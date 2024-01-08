import React, { useEffect } from "react";
import { supabase } from "../../helper/supabase.js";
import { useQuery } from "@tanstack/react-query";
import { infiniteQuery } from "../../helper/infiniteQuery.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useIntersection } from "@mantine/hooks";
import ArtistCard from "../../components/ArtistCard/ArtistCard.jsx";
import classNames from "classnames/bind";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import SortSelect from "../../components/SortSelect/SortSelect.jsx";
import styles from "./style.module.css";

function MainLayout() {
  const [posts, setPosts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");
  // Infinite Scroll 
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = infiniteQuery();
  const lastPostRef = React.useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  useEffect(() => {
    setPosts(data?.pages.flatMap((page) => page));
  }, [data]);
  // Search Function Implementation
  useEffect(() => {
    if (search !== "") {
      let _data = async () => {
        let _data = await supabase
          .from("FF42")
          .select("*")
          .like("author_name", `%${search}%`);
        return _data;
      };
      _data().then((result) => {
        setPosts(result?.data.flatMap((page) => page));
      });
    }
    if (search === "") {
      setPosts(data?.pages.flatMap((page) => page));
    }
  }, [search]);



  if (!posts) {
    return <div>Loading...</div>; // or some loading spinner
  }
  if (status === "error") {
    return <div>error</div>;
  }
  const sx = classNames.bind(styles);
  return (
    <div className={sx("MainContainer")}>
      <form className={sx("searchContainer")}>
        <SearchBox setSearch={setSearch} />
      </form>
      <div className={sx("filterContainer")}>
        <SortSelect filter={filter} setFilter={setFilter}/>
      </div>
      <div className={sx("ArtistContainer")}>
        {posts.map((item, index) => {
          if (index === posts.length - 1 && search === "") {
            return (
              <ArtistCard
                key={item.id + index + item}
                data={item}
                passRef={ref}
                ref={lastPostRef}
              />
            );
          }
          return <ArtistCard key={item.id} data={item} />;
        })}
        {}
      </div>
    </div>
  );
}
export default MainLayout;
