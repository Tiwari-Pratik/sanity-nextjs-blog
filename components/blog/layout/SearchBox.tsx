import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "./SearchBox.module.css";
import { ChangeEvent, useRef, useState } from "react";
import Modal from "./Modal";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

const SearchBox = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [postData, setPostData] = useState<Post[]>([] as Post[]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusHandler = () => {
    setShowModal(true);
  };
  const blurHandler = () => {
    setShowModal(false);
    const input = inputRef.current!;
    input.value = "";
    setPostData([]);
  };
  const searchInputHandler = async (event: ChangeEvent) => {
    // console.log("searching");
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (value.trim() !== "") {
      const query = groq`
*[_type=="post" && title match "${value}*" || body[].children[].text match "${value}*"]
{
...,
author->,
categories[]->
}
`;

      const data = await client.fetch(query);
      setPostData(data);
    } else {
      setPostData([]);
    }
    // console.log(postData);
  };

  return (
    <div className={styles.searchDiv}>
      <input
        type="search"
        className={styles.search}
        placeholder="Search for..."
        onFocus={focusHandler}
        // onBlur={blurHandler}
        onChange={searchInputHandler}
        ref={inputRef}
      />
      <MagnifyingGlassIcon className={styles.searchIcon} />
      <Modal show={showModal} data={postData} blurHandler={blurHandler} />
    </div>
  );
};

export default SearchBox;
