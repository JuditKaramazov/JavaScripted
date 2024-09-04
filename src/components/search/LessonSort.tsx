import styles from "./LessonSort.module.css";

export default function LessonSort({
  setSort,
  value,
}: {
  setSort: (value: "name" | "progress") => void;
  value: "name" | "progress";
}) {
  return (
    <div className="lessons-sort flex items-center gap-2">
      <small>Sort:</small>
      <button
        onClick={() => setSort("progress")}
        className={`${styles.toggle} ${
          value === "progress" ? styles.active : ""
        }`}
      >
        Progress
      </button>
      <button
        onClick={() => setSort("name")}
        className={`${styles.toggle} ${value === "name" ? styles.active : ""}`}
      >
        Name
      </button>
    </div>
  );
}
