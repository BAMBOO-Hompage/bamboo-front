import React from "react";

interface CardProps {
  img: string;
  title: string;
  tags: string[];
  date: string;
  authors: string[];
  link: string;
}

const StudyCard: React.FC<CardProps> = ({
  img,
  title,
  tags,
  date,
  authors,
  link,
}) => {
  const styles = {
    card: {
      width: "300px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      textDecoration: "none",
      color: "white",
    },
    imageContainer: {
      width: "100%",
      height: "150px",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    },
    content: {
      padding: "16px",
    },
    title: {
      fontSize: "1.2em",
      marginBottom: "8px",
    },
    tagsContainer: {
      display: "flex",
      gap: "8px",
      marginBottom: "8px",
    },
    tag: {
      backgroundColor: "#eef",
      color: "#3366cc",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "0.8em",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "0.8em",
      color: "#555",
    },
    authorsContainer: {
      display: "flex",
      gap: "4px",
    },
    author: {
      backgroundColor: "#f4f4f4",
      padding: "2px 6px",
      borderRadius: "4px",
    },
  };

  return (
    <a style={styles.card} href={link} target="_blank">
      <div style={styles.imageContainer}>
        <img src={img} style={styles.image} />
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <div style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <span key={index} style={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div style={styles.footer}>
          <span>{date}</span>
          <div style={styles.authorsContainer}>
            {authors.map((author, index) => (
              <span key={index} style={styles.author}>
                {author}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default StudyCard;
