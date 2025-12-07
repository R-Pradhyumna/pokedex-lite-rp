import styles from "./Skeleton.module.css";

function Skeleton() {
  return (
    <div className={styles.skeletonPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroTextLines}>
          <div className={`${styles.heroLineLg} ${styles.shimmer}`} />
          <div className={`${styles.heroLineMd} ${styles.shimmer}`} />
          <div className={`${styles.heroLineMd} ${styles.shimmer}`} />
          <div className={styles.heroButtons}>
            <div className={`${styles.heroButton} ${styles.shimmer}`} />
            <div className={`${styles.heroButton} ${styles.shimmer}`} />
          </div>
        </div>

        <div className={styles.heroMedia}>
          <div className={styles.heroMediaTop}>
            <div className={`${styles.heroPillSm} ${styles.shimmer}`} />
            <div className={`${styles.heroPillSm} ${styles.shimmer}`} />
          </div>
          <div className={`${styles.heroViewport} ${styles.shimmer}`} />
        </div>
      </section>

      {/* Type chips */}
      <section className={styles.typesRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${styles.typeChip} ${styles.shimmer}`} />
        ))}
      </section>

      {/* Grid header */}
      <section className={styles.gridHeader}>
        <div className={styles.gridTitleLines}>
          <div className={`${styles.gridLineSm} ${styles.shimmer}`} />
          <div className={`${styles.gridLineMd} ${styles.shimmer}`} />
        </div>
        <div className={`${styles.gridToggle} ${styles.shimmer}`} />
      </section>

      {/* Cards */}
      <section>
        <div className={styles.grid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={styles.card}>
              <div className={`${styles.cardImage} ${styles.shimmer}`} />
              <div className={`${styles.cardName} ${styles.shimmer}`} />
              <div className={styles.cardTypes}>
                <div className={`${styles.cardTypeChip} ${styles.shimmer}`} />
                <div className={`${styles.cardTypeChip} ${styles.shimmer}`} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <div className={`${styles.paginationButton} ${styles.shimmer}`} />
          <div className={`${styles.paginationButton} ${styles.shimmer}`} />
        </div>
      </section>
    </div>
  );
}

export default Skeleton;
