import { useState } from "react";
import Callout from "./Callout";
import LessonCard from "./LessonCard";
import LessonSort from "./LessonSort";
import styles from "./LessonsList.module.css";

function insertCallouts(arr, callouts) {
  const newArr = [...arr];
  const middleIndex = Math.floor(newArr.length / 2);

  newArr.unshift(callouts[0]);
  newArr.splice(middleIndex + 2, 0, callouts[1]);
  newArr.push(callouts[2]);

  return newArr;
}

function sortAlphabetical(a, b) {
  if (a.data.name < b.data.name) {
    return -1;
  }
  if (a.data.name > b.data.name) {
    return 1;
  }
  return 0;
}

function sortByProgress(a, b) {
  if (a.data.rank < b.data.rank) {
    return -1;
  }
  if (a.data.rank > b.data.rank) {
    return 1;
  }
  return 0;
}

const sortMap = {
  name: sortAlphabetical,
  progress: sortByProgress,
};

export default function LessonsList({ lessons }) {
  const [sort, setSort] = useState<"name" | "progress">("progress");

  const list = lessons.sort(sortMap[sort]);
  const listWithCallouts = insertCallouts(list, [
    {
      id: "Callout 1",
      image: "boom",
      imageWidth: "284",
      imageHeight: "180",
      imageAlt: "Boom retro image, comic style.",
      pitch: "My book, Insights from a Junior to future Seniors, is out - and free!",
      link: "https://github.com/JuditKaramazov/InsightsFromJuniorToFutureSeniors",
    },
    {
      id: "Callout 2",
      image: "buymeacoffee",
      imageWidth: "100",
      imageHeight: "206",
      imageAlt: "Buymeacoffee original logo.",
      pitch: "Are you enjoying the content? It's for fun - and profit, too!",
      link: "https://www.buymeacoffee.com/juditkaramazov",
    },
    {
      id: "Callout 3",
      image: "poison",
      imageWidth: "240",
      imageHeight: "186",
      imageAlt: "Poison bottle, cartoonish style.",
      pitch: "Part of the poisonous Pythomazov",
      link: "https://pythomazov.tech",
    }
  ]);

  return (
    <section className={styles["lessons-grid"]}>
      <div className={styles["lessons-controls"]}>
        <LessonSort setSort={setSort} value={sort} />
      </div>
      <ul className={styles["lessons-list"]}>
        {listWithCallouts.map(
          ({ data, id, image, imageWidth, imageHeight, imageAlt, pitch, link }) => {
            if (!data) {
              return (
                <Callout
                  key={id}
                  image={image}
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}
                  imageAlt={imageAlt}
                  pitch={pitch}
                  link={link}
                />
              );
            }
            return (
              <LessonCard key={id} name={data.name} tagline={data.tagline} />
            );
          }
        )}
      </ul>
    </section>
  );
}
